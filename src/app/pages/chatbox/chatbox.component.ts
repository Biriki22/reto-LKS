import { Component } from '@angular/core';
import { TextoComponentComponent } from "../../components/texto.component/texto.component.component";
import { ChatComponent } from "../../components/chat.component/chat.component"
import { SideMenuComponent } from '../../components/sidebar/side-menu.component';
import { HistorialAntiguoComponentComponent } from '../../components/sidebar/historial-antiguo.component/historial-antiguo.component.component';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'chatbox',
  imports: [HistorialAntiguoComponentComponent, RouterOutlet, SideMenuComponent, ChatComponent],

  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
