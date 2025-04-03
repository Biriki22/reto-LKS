import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatComponent } from '../components/chat.component/chat.component';

export interface Conversation {
  id: number;
  title: string;
  mensaje: { sender: string; content: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicioFase2Service {
  private conversations: Conversation[] = [];
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  conversations$ = this.conversationsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  addConversation(title: string) {
    if (!title.trim()) return;

    const newConversation: Conversation = {
      id: this.conversations.length + 1,
      title,
      mensaje: [], // Inicializar el array correctamente
    };

    this.conversations.push(newConversation);
    this.conversationsSubject.next([...this.conversations]);
    this.saveToLocalStorage();
  }

  addMessage(conversationId: number, sender: string, content: string) {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    if (!conversation) return;

    // Agregar el mensaje al array
    conversation.mensaje.push({ sender, content });

    // Actualizar la lista de conversaciones
    this.conversationsSubject.next([...this.conversations]);
    this.saveToLocalStorage();
  }

  addMessageToConversation(conversationId: number, sender: 'user' | 'bot', content: string) {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      conversation.mensaje.push({ sender, content });
      this.conversationsSubject.next([...this.conversations]);
      this.saveToLocalStorage();
    }
  }

  getLastConversationId(): number | null {
    return this.conversations.length > 0 ? this.conversations[this.conversations.length - 1].id : null;
  }

  createNewConversation(title: string): number {
    const newConversation: Conversation = {
      id: this.conversations.length + 1,
      title,
      mensaje: [],
    };

    this.conversations.push(newConversation);
    this.conversationsSubject.next([...this.conversations]);
    this.saveToLocalStorage();

    return newConversation.id;
  }


  private saveToLocalStorage() {
    localStorage.setItem('conversations', JSON.stringify(this.conversations));
  }

  private loadFromLocalStorage() {
    const storedData = localStorage.getItem('conversations');
    if (storedData) {
      this.conversations = JSON.parse(storedData);
      this.conversationsSubject.next([...this.conversations]);
    }
  }

  deleteConversation(id: number) {
    this.conversations = this.conversations.filter(conv => conv.id !== id);
    this.conversationsSubject.next([...this.conversations]);
    this.saveToLocalStorage();
  }
}
