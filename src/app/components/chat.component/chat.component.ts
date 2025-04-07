import { Component, inject, Output } from '@angular/core';
import { TextoComponentComponent } from "../texto.component/texto.component.component";
import { CommonModule, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServicioFase1Service } from '../../services/servicio.fase1.service';
import { ServicioFase2Service } from '../../services/servicio.fase2.service';
interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  imageUrl?: string;
}

@Component({
  selector: 'app-chat',
  imports: [NgClass, CommonModule, TextoComponentComponent,HttpClientModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  messages: ChatMessage[] = [];
  apiUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';

  fase1 =inject(ServicioFase1Service);//inyectamos nuestro servicio con la llamada a la api

  fase2 = inject(ServicioFase2Service);


  conversationId: number=0; // Variable para almacenar la conversación activa

  limpiarChat() {
    this.messages = []
  }

  ngOnInit() {
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de LKS. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      imageUrl: 'https://www.lksnext.com/wp-content/uploads/2020/04/lks-logo-positivo.png',
      timestamp: new Date(),
    });
  }


  handleUserMessage(userText: string) {
    if (!userText.trim() || this.conversationId === null) return;

    // Agregar mensaje del usuario
    this.messages.push({ text: userText, sender: 'user', timestamp: new Date() });

    // Guardar mensaje en la conversación activa
    this.fase2.addMessageToConversation(this.conversationId, 'user', userText);

    // Enviar a la API y guardar respuesta
    this.fase1.postQuestion(userText).subscribe(
      (response: any) => {
        const botResponse = response.answare;

        // Agregar mensaje del bot al chat
        this.messages.push({
          text: botResponse,
          sender: 'bot',
          imageUrl: 'https://www.lksnext.com/wp-content/uploads/2020/04/lks-logo-positivo.png',
          timestamp: new Date(),
        });

        // Guardar respuesta del bot en el historial
        this.fase2.addMessageToConversation(this.conversationId, 'bot', botResponse);
      },
      (error) => {
        const errorMsg = 'Error al obtener respuesta del bot 😞';

        // Mostrar error en el chat
        this.messages.push({ text: errorMsg, sender: 'bot', timestamp: new Date() });

        // Guardar error en el historial
        this.fase2.addMessageToConversation(this.conversationId, 'bot', errorMsg);
      }
    );
  }
}
