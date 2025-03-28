import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgClass, CommonModule } from '@angular/common';
import { ChatConversationComponent } from "../chat-conversation/chat-conversation.component";

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [NgClass, CommonModule, ChatConversationComponent],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  apiUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';

  constructor(private http: HttpClient) {}

  handleUserMessage(userText: string) {
    // Agregar mensaje del usuario
    this.messages.push({ text: userText, sender: 'user', timestamp: new Date() });

    // Enviar la consulta a la API
    this.http.post<{ respuesta: string }>(this.apiUrl, { mensaje: userText }).subscribe(
      (response) => {
        this.messages.push({ text: response.respuesta, sender: 'bot', timestamp: new Date() });
      },
      (error) => {
        this.messages.push({ text: 'Error al obtener respuesta del bot 😞', sender: 'bot', timestamp: new Date() });
      }
    );
  }
}
