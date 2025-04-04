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

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    this.conversations$ = this.historyService.conversations$;
  }

  // Método para guardar una nueva conversación
  saveConversation() {
    if (this.newTitle.trim()) {
      this.historyService.addConversation(this.newTitle);
      this.newTitle = ''; // Limpiar el input
    }
  }

  // Método para eliminar una conversación por su ID
  deleteConversation(id: number) {
    this.historyService.deleteConversation(id);
  }

  //Metodo para mostrar y ocultar el sidebar
  // Se inicializa en true para que el sidebar esté visible al cargar la página
  isSidebarVisible = true;

  // Método para alternar la visibilidad del sidebar
  // Se utiliza el operador ! para cambiar el valor de isSidebarVisible entre true y false
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}

