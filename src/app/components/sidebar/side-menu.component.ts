import { Component} from '@angular/core';
import { ServicioFase2Service } from '../../services/servicio.fase2.service';
import { NgIf, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [ FormsModule, CommonModule]
})
export class SideMenuComponent {
  newTitle: string = '';
  conversations$: any;

  constructor(public readonly historyService: ServicioFase2Service) {}

  ngOnInit() {
    this.conversations$ = this.historyService.conversations$;
  }

  saveConversation() {
    if (this.newTitle.trim()) {
      this.historyService.addConversation(this.newTitle);
      this.newTitle = ''; // Limpiar el input
    }
  }

  deleteConversation(id: number) {
    this.historyService.deleteConversation(id);
  }

  isSidebarVisible = true;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

