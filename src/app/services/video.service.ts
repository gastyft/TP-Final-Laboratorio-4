import { Injectable } from '@angular/core';
import { Video } from '../models/video.model';
 
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor( ) { }


  private videos: Video[] = [
    {
      id: 1,
      title: 'juana',
      descripcion:"AWD",
      url: 'https://firebasestorage.googleapis.com/v0/b/persistencia-videos.appspot.com/o/uploads%2Fjuana.mp4?alt=media&token=9811c674-86a2-436d-917a-97864602d8ca',//'assets/juana.mp4',
      thumbnailUrl: 'assets/thumbnails/thumb1.jpg',
      isVisto:true,
        },
    { 
      id: 2,
      title: 'puente',
      descripcion:"AWD",
      url: 'https://firebasestorage.googleapis.com/v0/b/persistencia-videos.appspot.com/o/uploads%2Fpuente.mp4?alt=media&token=5e5ca639-74d0-40e4-a0ee-b074c2613062',
      thumbnailUrl: 'assets/thumbnails/thumb2.jpg',
      isVisto:true,
    },
    {
      id: 3,
      title: 'Let me down slowly',
      descripcion:"AWD",
      url:'https://www.youtube.com/watch?v=50VNCymT-Cs',
      thumbnailUrl: 'assets/thumbnails/thumb3.jpg', 
      isVisto:true,
    },
   
  ];

  guardarVideos(video:Video){
    video.id = this.videos.length+1;
    this.videos.push(video);
   console.log(this.videos);
  }

  getVideosById(id:number): Video  | undefined{ //LOCAL
    console.log(id);
    return this.videos.find(v => v.id === id);
  }

  }
 