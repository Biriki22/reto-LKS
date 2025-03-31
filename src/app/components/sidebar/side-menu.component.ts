import { Component} from '@angular/core';
import { ServicioFase2Service } from '../../services/servicio.fase2.service';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-side-menu',
  standalone: true, // Es un componente standalone
  templateUrl: './side-menu.component.html',
  imports: [ FormsModule, CommonModule] // Agrega FormsModule aquí
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
