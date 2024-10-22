import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 
// Declarar la variable global YT
declare var YT: any;

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [RouterLink, CommonModule,],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges {
  @Input() videoId!: number;
  video!: Video;
  safeUrl: SafeResourceUrl | null = null; // Variable para guardar la URL saneada
  @Output() videoSeen = new EventEmitter<number>();
  player: any; // Variable para el reproductor de YouTube
  private isYouTubeApiLoaded = false; // Estado de la API de YouTube
  private checkIntervalId: any; // ID del intervalo para verificar el tiempo del video

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
       
        this.safeUrl = this.sanitizeYoutubeUrl(this.video.url);
        
        this.loadYouTubeAPI();
      } else {
        
        this.safeUrl = null;
        
        
            }
    }
  }

 
  sanitizeYoutubeUrl(url: string): SafeResourceUrl {
    const embedUrl = url.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);  
  }

 
  onVideoEnded() {
    console.log('El video ha terminado:', this.videoId);
    this.videoSeen.emit(this.videoId); // Emitir cuando termina
  }

  loadYouTubeAPI() {
    if (!this.isYouTubeApiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      this.handleLocalVideoEnded();
      window.onYouTubeIframeAPIReady = () => {
        this.onYouTubeIframeAPIReady();
      };

      this.isYouTubeApiLoaded = true;  
    } else {
      this.onYouTubeIframeAPIReady();
    }
  }
  loadLocalVideo(url: string) {
    const videoElement = document.getElementById('local-video-player') as HTMLVideoElement;
    if (videoElement) {
      videoElement.src = url;
      videoElement.load();
      videoElement.play();
    }
  }
  private onYouTubeIframeAPIReady() {
    this.player = new YT.Player('player', {
      videoId: this.videoId,
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
      }
    });
  }
  
  private onPlayerStateChange(event: any) {
    if (event.data === YT.PlayerState.ENDED) {
      console.log('El video de YouTube ha terminado de reproducirse.');
      this.videoSeen.emit(this.videoId); // Emitir un evento si es necesario
    }
  }
   
  onPlayerReady(event: any) {
    console.log('El reproductor de YouTube está listo');
  }

 

  handleLocalVideoEnded() {
  this.onVideoEnded(); 
  }

  ngOnDestroy() {
    
    if (this.checkIntervalId) {
      clearInterval(this.checkIntervalId);
    }
  }
}
