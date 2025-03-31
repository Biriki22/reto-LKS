import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Conversation {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServicioFase2Service {
  private conversations: Conversation[] = [];
  private conversationsSubject = new BehaviorSubject<Conversation[]>([]);

  conversations$ = this.conversationsSubject.asObservable();

  constructor() {}

  addConversation(title: string) {
    if (!title.trim()) return;

    const newConversation: Conversation = {
      id: this.conversations.length + 1,
      title,
    };

    this.conversations.push(newConversation);
    this.conversationsSubject.next([...this.conversations]);
  }
}
