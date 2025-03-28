import { Component } from '@angular/core';
import { TextoComponentComponent } from "../../components/texto.component/texto.component.component";

@Component({
  selector: 'app-chatbox',
  imports: [TextoComponentComponent],
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
