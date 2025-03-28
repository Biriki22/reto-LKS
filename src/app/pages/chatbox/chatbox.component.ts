import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  imports: [],
  templateUrl: './chatbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatboxComponent { }
