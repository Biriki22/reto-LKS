import { Component } from '@angular/core';
import { TextoComponentComponent } from "../../components/texto.component/texto.component.component";
import { ChatComponent } from "../../components/chat.component/chat.component"

@Component({
  selector: 'app-chatbox',
  imports: [TextoComponentComponent, ChatComponent],
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
