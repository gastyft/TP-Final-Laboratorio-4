import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, HostListener  } from '@angular/core';
import { Clase } from '../../../models/clase.model';
import { VideoService } from '../../../services/video.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ClaseService } from '../../../services/clase.service';

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
  imports: [RouterLink, CommonModule],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements OnChanges {
  @Input() videoId!: number;
  video!: Clase;
  safeUrl: SafeResourceUrl | null = null; 
  @Output() videoSeen = new EventEmitter<number>();
  player: any; 
  private isYouTubeApiLoaded = false; 

  constructor(private videoService: VideoService, private sanitizer: DomSanitizer,private claseService: ClaseService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['videoId'] && this.videoId !== undefined) {
      this.loadVideo(this.videoId);
    }
  }
  videoError = false;
  @HostListener('window:online', ['$event'])
  onReconnect() {
    this.videoError = false;
  }
  /* ORIGINAL HARDCODEADO
  loadVideo(videoId: number) {
    const vid = this.videoService.getVideosById(videoId);
    if (!vid) {
      console.error(`Video con ID ${videoId} no encontrado.`);
    } else {
      this.video = vid;

      // Comprobar si es un video de YouTube
      if (this.video.url.includes('youtube.com')) {
        this.safeUrl = this.sanitizeYoutubeUrl(this.video.url);
        this.loadYouTubeAPI();
      this.onVideoEnded();
      } else if (this.video.url.endsWith('.mp4')) {
        // Es un video local o de Firebase
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
      } else {
        this.safeUrl = null; 
      }
    }
  }
    */
  loadVideo(videoId: number) {
    this.claseService.getClaseById(videoId).subscribe(
      (vid) => {
        this.video = vid;

        // Comprobar si es un video de YouTube
        if (this.video.url.includes('youtube.com')) {
          this.safeUrl = this.sanitizeYoutubeUrl(this.video.url);
          this.loadYouTubeAPI();
          this.onVideoEnded();
        } else if (this.video.url.endsWith('.mp4')) {
          // Es un video local o de Firebase
          this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.video.url);
        } else {
          this.safeUrl = null; 
        }
      },
      (error) => {
        console.error(`Error al obtener el video con ID ${videoId}:`, error);
      }
    );
  }

  sanitizeYoutubeUrl(url: string): SafeResourceUrl {
    const embedUrl = url.replace('watch?v=', 'embed/');
    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);  
  }

  onVideoEnded() {
    console.log('El video ha terminado:', this.videoId);
    this.videoSeen.emit(this.videoId); 
  }

  loadYouTubeAPI() {
    if (!this.isYouTubeApiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = () => {
        this.onYouTubeIframeAPIReady();
      };
      this.isYouTubeApiLoaded = true;  
    } else {
      this.onYouTubeIframeAPIReady();
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
      this.videoSeen.emit(this.videoId); 
    }
  }
}
