import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

// Interfaz para definir la estructura de la respuesta del chat
export interface ChatResponse {
  answare: string;
}

// Decorador que marca esta clase como un servicio inyectable
@Injectable({
  providedIn: 'root'
})

export class ServicioFase1Service {
  // Inyección del cliente HTTP para realizar solicitudes
  private http = inject(HttpClient)
  apiURL ="https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar"
  apiKey = ""
  constructor() { }

  // Método para enviar una pregunta al chatbot
  postQuestion(question: string){
    const url = `${this.apiURL}`;

    // Cuerpo de la solicitud HTTP
    const body = {
      "question" : question,
    }
    // Realiza una solicitud POST a la API y devuelve un observable con la respuesta
    return this.http.post<ChatResponse>(this.apiURL, body);
  }
}
