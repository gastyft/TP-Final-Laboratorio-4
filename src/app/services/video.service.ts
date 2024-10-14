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
    },
    {
      id:3,
      title: 'Let me down slowly',
      url:'https://www.youtube.com/watch?v=50VNCymT-Cs',
      thumbnailUrl: 'assets/thumbnails/thumb3.jpg', 
     
    }
   
  ];

  getVideosById(id:number): Video  | undefined{
    console.log(id);
    return this.videos.find(v => v.id === id);
  }
}
