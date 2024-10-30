import { Component } from '@angular/core';
import { StorageService } from '../../services/firebase-storage.service';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clase } from '../../models/clase.model';
import swal from 'sweetalert';


@Component({
  selector: 'app-crear-clase',
  standalone:true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
})
export class CrearClaseComponent {
  titulo: string = '';
  descripcion: string = '';
  linkVideo: string = '';
  video: File | null = null;

  constructor(private videoService: VideoService, private storageService: StorageService) {}


 
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.video = input.files[0]; 
    } else {
      console.error("No se ha seleccionado ningún archivo.");
    }
  }
 
  guardarClase() {
    if (this.video) {

      this.storageService.uploadFile(this.video).then((url) => {
        console.log("Archivo subido exitosamente:", url);
        this.linkVideo = url; 

        const clase: Clase = {
          id: 0,
          title: this.titulo,
          descripcion: this.descripcion,
          url: this.linkVideo,
          isVisto: false,
        };
       if(clase.url.includes("youtube.com") || clase.url.includes('firebasestorage')) {
     
        this.videoService.guardarVideos(clase);
        
        swal("Good job!", "Clase creada", "success");
      }
       
      }).catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
    } else {
 
      swal("Atención", "Falta video", "warning");
      return;
  
    }
    this.titulo = '';
    this.descripcion = '';
    this.linkVideo = '';
    this.video=null;
  }
}

 