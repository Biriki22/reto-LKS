import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface ChatResponse {
  answare: string;
}


@Injectable({
  providedIn: 'root'
})


export class ServicioFase1Service {
  private http = inject(HttpClient)
  apiURL ="https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar" //Url de nuestra API
  apiKey = ""
  constructor() { }

  postQuestion(question: string){
    const url = `${this.apiURL}`;

    const body = {
      "question" : question,
    }
    return this.http.post<ChatResponse>(this.apiURL, body);

  }

}
