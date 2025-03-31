import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

<<<<<<< HEAD
export interface ChatResponse {
  answare: string;
}
=======
>>>>>>> 2e933a42cf71060bfc7891e076e14fd719ddc623

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
<<<<<<< HEAD
    const body = {
      "question" : question,
    }
    return this.http.post<ChatResponse>(this.apiURL, body);
=======
    const body = {question} //definimos el body que tiene nuestra API en este caso una pregunta
    return this.http.post(url, body);
>>>>>>> 2e933a42cf71060bfc7891e076e14fd719ddc623
  }

}
