import { Component } from '@angular/core';
import { TextoComponentComponent } from "../../components/texto.component/texto.component.component";
<<<<<<< HEAD
import { ChatComponent } from "../../components/chat.component/chat.component"

@Component({
  selector: 'app-chatbox',
  imports: [TextoComponentComponent, ChatComponent],
=======
import { HistorialAntiguoComponentComponent } from "../../components/sidebar/historial-antiguo.component/historial-antiguo.component.component";
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/sidebar/side-menu.component";

@Component({
  selector: 'app-chatbox',
  imports: [TextoComponentComponent, HistorialAntiguoComponentComponent, RouterOutlet, SideMenuComponent],
>>>>>>> 26728c1eb5c0a5651b11c820191d1b403f36b802
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
