import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface Conversation {
  id: number;
  titulo: string;
  mensaje: { sender: string; content: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ServicioFase2Service {
  private conversations: Conversation[] = [];
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  conversations$ = this.conversationsSubject.asObservable();

  private apiUrl = 'http://localhost:3001/api/conversations'; // URL de tu API

  constructor(private http: HttpClient) {
    this.loadConversations(); // Cargar las conversaciones al iniciar
  }

  // Cargar las conversaciones desde la base de datos
  loadConversations() {
    this.http.get<Conversation[]>(this.apiUrl).subscribe((data) => {
      this.conversations = data;
      this.conversationsSubject.next([...this.conversations]);
    });
  }

  // Agregar una nueva conversación (en la base de datos)
  addConversation(titulo: string) {
    if (!titulo.trim()) return;

    const newConversation: Conversation = {
      titulo, mensaje: [],
      id: 0
    };

    // Enviar la nueva conversación al backend
    this.http.post<Conversation>(this.apiUrl, newConversation).subscribe((createdConversation) => {
      this.conversations.push(createdConversation);
      this.conversationsSubject.next([...this.conversations]);
    });
  }

  // Agregar un mensaje a una conversación
  addMessageToConversation(conversationId: number, sender: 'user' | 'bot', content: string) {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      conversation.mensaje.push({ sender, content });

      // Actualizar la conversación en el backend (opcional)
      this.http.put(`${this.apiUrl}/${conversationId}`, conversation).subscribe();

      this.conversationsSubject.next([...this.conversations]);
    }
  }

  // Eliminar una conversación
  deleteConversation(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.conversations = this.conversations.filter(conv => conv.id !== id);
      this.conversationsSubject.next([...this.conversations]);
    });
  }
}
