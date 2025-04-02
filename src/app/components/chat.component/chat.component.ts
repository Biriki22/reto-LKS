import { Component, inject } from '@angular/core';
import { TextoComponentComponent } from "../texto.component/texto.component.component";
import { CommonModule, NgClass } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ServicioFase1Service } from '../../services/servicio.fase1.service';


interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  imageUrl?: string;
}

@Component({
  selector: 'app-chat',
  imports: [NgClass, CommonModule, TextoComponentComponent,HttpClientModule],
  templateUrl: './chat.component.html',
})
export class ChatComponent {
  messages: ChatMessage[] = [

  ];
  apiUrl = 'https://chatbot-normativa-laboral.azurewebsites.net/Chat/Enviar';

  fase1 =inject(ServicioFase1Service); //inyectamos nuestro servicio con la llamada a la api

  ngOnInit() {
    // Mensaje de bienvenida del bot al iniciar la conversación
    this.messages.push({
      text: '¡Hola! Soy el asistente virtual de LKS. ¿En qué puedo ayudarte hoy?',
      sender: 'bot',
      timestamp: new Date(),
    });
  }

  handleUserMessage(userText: string) {
        // Agregar mensaje del usuario
        this.messages.push({ text: userText, sender: 'user', timestamp: new Date() }); //Mostramos el mensaje introducido por el usuario

        // Enviar la consulta a la API
        this.fase1.postQuestion(userText).subscribe(
          (response: any) => {
            //console.log(response);
            this.messages.push({ text: response.answare, sender: 'bot', timestamp: new Date() });
          },
          (error) => {
            this.messages.push({ text: 'Error al obtener respuesta del bot 😞', sender: 'bot', timestamp: new Date() }); //En caso de erros mostramos que que el bot esta dando error
          }
        );
      }
}

