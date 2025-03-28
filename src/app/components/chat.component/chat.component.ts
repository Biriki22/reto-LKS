import { Component, inject } from '@angular/core';
import { TextoComponentComponent } from "../texto.component/texto.component.component";
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ServicioFase1Service } from '../../services/servicio.fase1.service';


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

  fase1 =inject(ServicioFase1Service);

  handleUserMessage(userText: string) {
        // Agregar mensaje del usuario
        this.messages.push({ text: userText, sender: 'user', timestamp: new Date() });

        // Enviar la consulta a la API
        this.fase1.postQuestion("Hola").subscribe(
          (response) => {
            console.log(response);
            this.messages.push({ text: 'response.anserware', sender: 'bot', timestamp: new Date() });
          },
          (error) => {
            this.messages.push({ text: 'Error al obtener respuesta del bot 😞', sender: 'bot', timestamp: new Date() });
          }
        );
      }
}

