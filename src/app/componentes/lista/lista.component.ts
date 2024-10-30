import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Curso } from '../../models/curso.model';
@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Output() videoSeleccionado = new EventEmitter<number>(); 
  @Input()  videosVistos: { [key: number]: boolean } = {};

  

  curso: Curso = {
    id: 1,
    title: 'Curso de Angular',
    descripcion: 'Aprende los fundamentos de la programación.',
    clases: [
      {
        id: 1,
        title: 'Juana',
        descripcion:"Juanita ",
        url: 'https://firebasestorage.googleapis.com/v0/b/persistencia-videos.appspot.com/o/uploads%2Fjuana.mp4?alt=media&token=9811c674-86a2-436d-917a-97864602d8ca',//'assets/juana.mp4',
      
        isVisto:true,
          },
      { 
        id: 2,
        title: 'Puente',
        descripcion:"Puente caminata",
        url: 'https://firebasestorage.googleapis.com/v0/b/persistencia-videos.appspot.com/o/uploads%2Fpuente.mp4?alt=media&token=5e5ca639-74d0-40e4-a0ee-b074c2613062',
       
        isVisto:true,
      },
      {
        id: 3,
        title: 'Firebase Storage',
        descripcion:"como persistir archivos en firebase",
        url:'https://www.youtube.com/watch?v=pKExopQKdyY&t=1946s',
       
        isVisto:true,
      },
      { 
        id: 4,
        title: 'puente 2',
        descripcion:"Puente caminata 2",
        url: 'https://firebasestorage.googleapis.com/v0/b/persistencia-videos.appspot.com/o/uploads%2Fpuente.mp4?alt=media&token=5e5ca639-74d0-40e4-a0ee-b074c2613062',
   
        isVisto:true,
      },
    ],
  };
  selectVideo(videoId: number):void {
    this.videoSeleccionado.emit(videoId); 
  }

  marcarVideoVisto(videoId: number) {
    this.videosVistos[videoId] = true;  
  }
//Crear metodo para marcar el video como visto, dependiendo del alumno


}
