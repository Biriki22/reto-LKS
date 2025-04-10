import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

// Interfaz para definir la estructura de un mensaje
export interface Message {
  sender: string;
  content: string;
}

// Interfaz para definir la estructura de una conversación
export interface Conversation {
  id: number;
  titulo: string;
  mensaje: Message[];
}

// Decorador que marca esta clase como un servicio inyectable
@Injectable({
  providedIn: 'root'
})
export class ServicioFase2Service {
  // Lista de conversaciones en memoria
  private conversations: Conversation[] = [];
  // BehaviorSubject para manejar las conversaciones de forma reactiva
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);
  conversations$ = this.conversationsSubject.asObservable();

  private apiUrl = 'http://localhost:3001/api/conversations';

  // Constructor que inyecta el cliente HTTP
  constructor(private http: HttpClient) {
    this.loadConversations();
  }

  // Método para cargar las conversaciones desde la base de datos
  loadConversations() {
    this.http.get<Conversation[]>(this.apiUrl).subscribe((data) => {
      this.conversations = data;

      // Cargar los mensajes para cada conversación
      data.forEach(conv => {
        this.http.get<Message[]>(`${this.apiUrl}/${conv.id}/messages`).subscribe(messages => {
          conv.mensaje = messages;
          this.conversationsSubject.next([...this.conversations]);
        });
      });
    });
  }

  // Método para obtener los mensajes de una conversación específica
  getMessagesByConversation(conversationId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3001/api/conversations/${conversationId}/messages`);
  }


  // Metodo para agregar una nueva conversación (en la base de datos)
  addConversation(titulo: string) {
    if (!titulo.trim()) return;

    const newConversation = { titulo };

    this.http.post<Conversation>(this.apiUrl, newConversation).subscribe((createdConversation) => {
      createdConversation.mensaje = [];
      this.conversations.push(createdConversation);
      this.conversationsSubject.next([...this.conversations]);
    });
  }

  // Agregar un mensaje a una conversación (y guardarlo en la base de datos)
  addMessageToConversation(conversationId: number, sender: 'user' | 'bot', content: string) {
    const conversation = this.conversations.find(conv => conv.id === conversationId);
    if (!conversation) return;

    const newMessage = { sender, content };

    this.http.post(`${this.apiUrl}/${conversationId}/messages`, newMessage).subscribe(() => {
      conversation.mensaje.push(newMessage);
      this.conversationsSubject.next([...this.conversations]);
    });
  }

  // Eliminar una conversación
  deleteConversation(id: number) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.conversations = this.conversations.filter(conv => conv.id !== id);
      this.conversationsSubject.next([...this.conversations]);
    });
  }
}
