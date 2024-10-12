import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Video } from '../../models/video.model';
import { VideoService } from '../../services/video.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css'
})


export class VideoPlayerComponent implements OnChanges {
  @Input() videoId: number | null = null; // Permitir null
  video: any; // O define un tipo específico para Video

  constructor(private videoService: VideoService) {}

  ngOnChanges() {
    if (this.videoId !== null) {
      this.loadVideo(this.videoId);
    }
  }

  loadVideo(videoId: number) {
    const vid = this.videoService.getVideosById(videoId);
    if (!vid) {
      console.error(`Video con ID ${videoId} no encontrado.`);
    } else {
      this.video = vid; // Asigna el video
    }
  }
}