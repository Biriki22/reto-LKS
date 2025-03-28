import { Routes } from '@angular/router';
import { ChatboxComponent } from './pages/chatbox/chatbox.component';

export const routes: Routes = [
  {
    path:"chatbox",
    component: ChatboxComponent,
  },
  {
    path:"**",
    redirectTo:"chatbox"

  }
];
