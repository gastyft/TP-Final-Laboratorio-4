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
    title: 'Curso de Programación',
    descripcion: 'Aprende los fundamentos de la programación.',
    listaVideos: [
      {
        id: 1,
        title: 'Introducción a TypeScript',
        descripcion: 'Un video sobre los fundamentos de TypeScript.',
        url: 'https://ejemplo.com/video1.mp4',
        thumbnailUrl: 'assets/thumbnails/thumb1.jpg',
        isVisto: false,
      },
      {
        id: 2,
        title: 'Avanzando en Angular',
        descripcion: 'Un video sobre características avanzadas de Angular.',
        url: 'https://ejemplo.com/video2.mp4',
        thumbnailUrl: 'assets/thumbnails/thumb2.jpg',
        isVisto: true,
      }
    ],
  };
  selectVideo(videoId: number):void {
    this.videoSeleccionado.emit(videoId); 
  }

  marcarVideoVisto(videoId: number) {
    this.videosVistos[videoId] = true;  
  }
}
