import { Component } from '@angular/core';
import { ServicioFase2Service } from '../../services/servicio.fase2.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  newTitle: string = '';

  constructor(public historyService: ServicioFase2Service) {}

  saveConversation() {
    if (this.newTitle.trim()) {
      this.historyService.addConversation(this.newTitle);
      this.newTitle = ''; // Limpiar el input
    }
  }
}
