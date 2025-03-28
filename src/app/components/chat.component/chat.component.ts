import { Component } from '@angular/core';
<<<<<<< HEAD
import { HttpClient } from '@angular/common/http';
import { NgClass, CommonModule } from '@angular/common';
import { ChatConversationComponent } from "../chat-conversation/chat-conversation.component";
=======
import { ChatboxComponent } from '../../pages/chatbox/chatbox.component';
import { TextoComponentComponent } from "../texto.component/texto.component.component";

>>>>>>> 599c644e4290a5e5b57c92fda40b951c5a58d6a4

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
<<<<<<< HEAD
  imports: [NgClass, CommonModule, ChatConversationComponent],
=======
  imports: [NgClass, CommonModule, TextoComponentComponent],
>>>>>>> 599c644e4290a5e5b57c92fda40b951c5a58d6a4
  templateUrl: './chat.component.html',
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
