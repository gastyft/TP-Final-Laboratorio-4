import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ListaComponent } from '../lista/lista.component';
import { VideoPlayerComponent } from '../video-player/video-player.component';
import { RouterLink } from '@angular/router';
import { Error404Component } from "../error404/error404.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [HeaderComponent, ListaComponent, VideoPlayerComponent, RouterLink, Error404Component],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
  selectedVideoId: number | null =null; // Variable para almacenar el ID del video seleccionado

  onVideoSeleccionado(videoId: number ): void {
    this.selectedVideoId = videoId; // Actualiza el ID del video seleccionado
  }
}
