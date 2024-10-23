import { Component } from '@angular/core';
import { StorageService } from '../../services/firebase-storage.service';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Video } from '../../models/video.model';
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
  video: File | null = null; // Almacena el archivo seleccionado

  constructor(private videoService: VideoService, private storageService: StorageService) {}

  // Método para seleccionar archivo
 
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.video = input.files[0]; // Obtener el primer archivo seleccionado
    } else {
      console.error("No se ha seleccionado ningún archivo.");
    }
  }

  // Método para guardar la clase
  guardarClase() {
    if (this.video) {
      // Subir el archivo y esperar a que termine
      this.storageService.uploadFile(this.video).then((url) => {
        console.log("Archivo subido exitosamente:", url);
        this.linkVideo = url; // Guarda la URL del archivo subido en linkVideo

        // Crear la clase después de que el archivo haya sido subido
        const clase: Video = {
          id: 0,
          title: this.titulo,
          descripcion: this.descripcion,
          url: this.linkVideo, // Usar la URL del archivo subido o el link proporcionado
          thumbnailUrl: "null", // Aquí puedes manejar la miniatura si es necesario
          isVisto: false,
        };

        // Guardar la clase usando videoService
        this.videoService.guardarVideos(clase);
        alert("Clase creada");

        // Resetea los campos si es necesario
        this.titulo = '';
        this.descripcion = '';
        this.linkVideo = '';
        this.video = null; // Resetea la selección del archivo
      }).catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
    } else {
      // Si no hay archivo, puedes proceder a crear la clase directamente usando el linkVideo
      const clase: Video = {
        id: 0,
        title: this.titulo,
        descripcion: this.descripcion,
        url: this.linkVideo, // Usar el link proporcionado
        thumbnailUrl: "null",
        isVisto: false,
      };

      // Guardar la clase usando videoService
      this.videoService.guardarVideos(clase);
      alert("Clase creada sin video");

      // Resetea los campos
      this.titulo = '';
      this.descripcion = '';
      this.linkVideo = '';
      this.video=null;
    }
  }
}