import { Component } from '@angular/core';
import { TextoComponentComponent } from "../../components/texto.component/texto.component.component";
import { HistorialAntiguoComponentComponent } from "../../components/sidebar/historial-antiguo.component/historial-antiguo.component.component";
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "../../components/sidebar/side-menu.component";

@Component({
  selector: 'app-chatbox',
  imports: [TextoComponentComponent, HistorialAntiguoComponentComponent, RouterOutlet, SideMenuComponent],
  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
