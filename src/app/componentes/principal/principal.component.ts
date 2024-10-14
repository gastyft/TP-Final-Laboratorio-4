import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ListaComponent } from '../lista/lista.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { RouterLink } from '@angular/router';
import { Error404Component } from "../error404/error404.component";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HeaderComponent, ListaComponent, VideoPlayerComponent, RouterLink, Error404Component],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
  constructor(public sanitizer: DomSanitizer){}
  selectedVideoId: number | null =null; // Variable para almacenar el ID del video seleccionado
  videosVistos: { [key: number]: boolean } = {};
  onVideoSeleccionado(videoId: number ): void {
    this.selectedVideoId = videoId; // Actualiza el ID del video seleccionado
  }
  marcarVideoVisto(videoId: number) {
    this.videosVistos[videoId] = true; // Marcar el video como visto
  }
}
