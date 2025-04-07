import { Component, EventEmitter, Output } from '@angular/core';
import { ServicioFase2Service } from '../../services/servicio.fase2.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// ...

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  imports: [FormsModule, CommonModule]
})
export class SideMenuComponent {
  @Output() seleccionarConversacion = new EventEmitter<number>(); // <-- nuevo

  newTitle: string = '';
  conversations$: any;
  selectedConversationId: number | null = null; // Para resaltar el activo

  constructor(public readonly historyService: ServicioFase2Service) {}

  ngOnInit() {
    this.conversations$ = this.historyService.conversations$;
  }

  saveConversation() {
    if (this.newTitle.trim()) {
      this.historyService.addConversation(this.newTitle);
      this.newTitle = '';
    }
  }

  deleteConversation(id: number) {
    this.historyService.deleteConversation(id);
    if (this.selectedConversationId === id) {
      this.selectedConversationId = null;
    }
  }

  seleccionarConversacionId(id: number) {
    this.selectedConversationId = id;
    this.seleccionarConversacion.emit(id); // 🔥 Emitir al padre
  }

  isSidebarVisible = true;
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

