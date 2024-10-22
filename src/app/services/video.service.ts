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
      url: 'assets/juana.mp4',
      thumbnailUrl: 'assets/thumbnails/thumb1.jpg',
      isVisto:true,
        },
    { 
      id: 2,
      title: 'puente',
      descripcion:"AWD",
      url: 'https://firebasestorage.googleapis.com/v0/b/persistencia-videos.appspot.com/o/puente.mp4?alt=media&token=907ac5a6-2764-47c7-a77b-be3f260d3c44',
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
 