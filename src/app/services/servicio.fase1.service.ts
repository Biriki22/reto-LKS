import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioFase1Service {
  private http = inject(HttpClient)
  apiURL ="https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar"
  apiKey = ""
  constructor() { }
  postQuestion(question: string){
    const url = `${this.apiURL}`;
    const body = {
      "question" : "",
    }
    return this.http.post(url, body);
  }

}
