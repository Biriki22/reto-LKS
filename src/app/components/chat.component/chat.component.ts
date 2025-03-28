import { NgClass, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChatConversationComponent } from "../chat-conversation/chat-conversation.component";

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  imports: [NgClass, ChatConversationComponent, CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  messages: ChatMessage[] = [];

  handleUserMessage(userText: string) {
    // Agregar mensaje del usuario
    this.messages.push({ text: userText, sender: 'user', timestamp: new Date() });

    // Simulación de respuesta del bot
    setTimeout(() => {
      this.messages.push({ text: 'Hola, soy un bot 🤖', sender: 'bot', timestamp: new Date() });
    }, 1000);
  }
}
