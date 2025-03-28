import { Component } from '@angular/core';
import { TextoComponentComponent } from "../texto.component/texto.component.component";
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';


interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [NgClass, CommonModule, TextoComponentComponent,HttpClientModule],
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

