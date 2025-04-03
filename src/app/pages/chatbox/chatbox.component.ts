import { Component } from '@angular/core';
import { ChatComponent } from "../../components/chat.component/chat.component"
import { SideMenuComponent } from '../../components/sidebar/side-menu.component';

@Component({
  selector: 'chatbox',
<<<<<<< HEAD
  imports: [ SideMenuComponent, ChatComponent],
=======
  imports: [SideMenuComponent, ChatComponent],
>>>>>>> 2a1c8e2692d555da61d7f08ee91cfd04752eae70

  templateUrl: './chatbox.component.html',
})
export class ChatboxComponent { }
