import { Component, inject } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServicioFase1Service } from '../../services/servicio.fase1.service';
import { ServicioFase2Service } from '../../services/servicio.fase2.service';
import { TextoComponentComponent } from "../texto.component/texto.component.component";

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  imageUrl?: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgClass, CommonModule, HttpClientModule, TextoComponentComponent],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
sendMessage(arg0: string) {
throw new Error('Method not implemented.');
}
  messages: ChatMessage[] = [];
  apiUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';

  fase1 = inject(ServicioFase1Service); // servicio para la API externa
  fase2 = inject(ServicioFase2Service); // servicio para la base de datos

  conversationId: number = 0; // ID de la conversación activa

  ngOnInit() {
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de LKS 🤖. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      imageUrl: 'https://www.lksnext.com/wp-content/uploads/2020/04/lks-logo-positivo.png',
      timestamp: new Date(),
    });
  }

  limpiarChat() {
    this.messages = [];
  }

  // Método nuevo para cargar mensajes de una conversación seleccionada
  cargarMensajes(id: number) {
    this.conversationId = id;
    this.messages = [];

    this.fase2.getMessagesByConversation(id).subscribe((msgs: any[]) => {
      this.messages = msgs.map(msg => ({
        text: msg.content,
        sender: msg.sender,
        timestamp: new Date(msg.timestamp),
        imageUrl: msg.sender === 'bot' ? 'https://www.lksnext.com/wp-content/uploads/2020/04/lks-logo-positivo.png' : undefined
      }));
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

        this.messages.push({
          text: botResponse,
          sender: 'bot',
          imageUrl: 'https://www.lksnext.com/wp-content/uploads/2020/04/lks-logo-positivo.png',
          timestamp: new Date(),
        });

        this.fase2.addMessageToConversation(this.conversationId, 'bot', botResponse);
      },
      (error) => {
        const errorMsg = 'Error al obtener respuesta del bot 😞';

        this.messages.push({ text: errorMsg, sender: 'bot', timestamp: new Date() });

        this.fase2.addMessageToConversation(this.conversationId, 'bot', errorMsg);
      }
    );
  }
}

