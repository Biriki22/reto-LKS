import {Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'chat-texto',
  imports: [],
  templateUrl: './texto.component.component.html',
})
export class TextoComponentComponent {
  @Output() messageSent = new EventEmitter<string>(); // Emitirá mensajes al componente padre


  sendMessage(userText: string) {
    if (!userText.trim()) return;
    this.messageSent.emit(userText);
  }
}
