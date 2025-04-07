import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./components/sidebar/side-menu.component";
import { ChatComponent } from "./components/chat.component/chat.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponent, ChatComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'reto';
}
