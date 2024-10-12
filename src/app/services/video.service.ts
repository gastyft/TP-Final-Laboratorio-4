import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private videos: Video[] = [
    {
      id: 1,
      title: 'juana',
      url: 'assets/juana.mp4',
      thumbnailUrl: 'assets/thumbnails/thumb1.jpg'
    },
    { 
      id: 2,
      title: 'dibu',
      url: 'assets/dibu.mp4',
      thumbnailUrl: 'assets/thumbnails/thumb2.jpg'
    }
    // Agrega más videos según sea necesario
  ];

  getVideosById(id:number): Video  | undefined{
    console.log(id);
    return this.videos.find(v => v.id === id);
  }
}
