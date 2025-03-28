import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chat-conversation',
  templateUrl: './chat-conversation.component.html',
  styleUrls: ['./chat-conversation.component.css']
})
export class ChatConversationComponent {
  @Output() messageSent = new EventEmitter<string>(); // Emitirá mensajes al componente padre

  sendMessage(userText: string) {
    if (!userText.trim()) return;
    this.messageSent.emit(userText);
  }
}
