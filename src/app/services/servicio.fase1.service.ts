import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


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
    const body = {question} //definimos el body que tiene nuestra API en este caso una pregunta
    return this.http.post(url, body);
  }

}
