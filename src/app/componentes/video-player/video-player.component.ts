import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges {
  @Input() videoId: number | undefined;
  video: any;
  safeUrl: SafeResourceUrl | null = null; // Variable para guardar la URL saneada
  @Output() videoSeen = new EventEmitter<number>();

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId'] && this.videoId !== undefined) {
      this.loadVideo(this.videoId);
    }
  }

  loadVideo(videoId: number) {
    const vid = this.videoService.getVideosById(videoId);
    if (!vid) {
      console.error(`Video con ID ${videoId} no encontrado.`);
    } else {
      this.video = vid;

      if (this.video.url.includes('youtube.com')) {
        // Si es un video de YouTube, sanea la URL y guárdala en safeUrl
        this.safeUrl = this.sanitizeYoutubeUrl(this.video.url);
      } else {
        // Si es un video local, asigna la URL directamente
        this.safeUrl = null;
      }
    }
  } 

  // Función para transformar y sanear la URL de YouTube
  sanitizeYoutubeUrl(url: string): SafeResourceUrl {
    const embedUrl = url.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl); // Sanear la URL
  }

  onVideoEnded() {
    if (typeof this.videoId === 'number') { // Verifica si videoId es un número
      this.videoSeen.emit(this.videoId);
    } else {
      console.error('videoId es undefined, no se puede emitir el evento.');
    }
  }

  // Método para manejar la finalización de los videos locales (MP4)
  handleLocalVideoEnded() {
    this.onVideoEnded();
  }

  // Método para manejar la finalización de los videos de YouTube
  addYouTubeEndListener() {
    const player = document.getElementById('youtube-player') as HTMLIFrameElement;
    if (player && player.contentWindow) {
      player.contentWindow.postMessage('{"event":"command","func":"addEventListener","args":["onStateChange"]}', '*');
      window.addEventListener('message', (event) => {
        if (event.data && typeof event.data === 'string' && event.data.includes('"event":"onStateChange"')) {
          const data = JSON.parse(event.data);
          if (data.info === 0) { // 0 significa que el video terminó
            this.onVideoEnded();
          }
        }
      });
    }
  }
}
