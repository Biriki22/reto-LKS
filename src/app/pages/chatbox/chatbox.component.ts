import { Component } from '@angular/core';
import { ChatComponent } from "../../components/chat.component/chat.component"
import { SideMenuComponent } from '../../components/sidebar/side-menu.component';

@Component({
  selector: 'chatbox',
  imports: [ SideMenuComponent, ChatComponent],


  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
