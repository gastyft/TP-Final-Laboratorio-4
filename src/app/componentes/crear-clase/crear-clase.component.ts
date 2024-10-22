import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Video } from '../../models/video.model';
import { StorageService } from '../../services/firebase-storage.service';

@Component({
  selector: 'app-crear-clase',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css']
})
export class CrearClaseComponent {
  titulo!: string;
  descripcion!: string;
  linkVideo!: string;
  video: File | null = null; // Almacena el archivo seleccionado

  constructor(private videoService: VideoService, private storageService: StorageService) {}

  // Método para seleccionar archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.video = file;
    }
  }

  // Método para subir el archivo
  onFileSelected2(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Autenticar al usuario antes de subir el archivo
      this.storageService.signIn('usuario@ejemplo.com', 'password123') // Aquí pasas el email y password correctos
        .then(() => {
          console.log('Usuario autenticado, procediendo a subir el archivo');
          return this.storageService.uploadFile(file);
        })
        .then(url => {
          console.log('Archivo subido y disponible en:', url);
          this.linkVideo = url; // Almacenar la URL del video
        })
        .catch(error => {
          console.error('Error en el proceso:', error);
        });
    }
  }

  // Método para guardar la clase
  guardarClase() {
    let clase: Video = {
      id: 0,
      title: this.titulo,
      descripcion: this.descripcion,
      url: this.linkVideo, // Usar la URL del archivo subido o el link proporcionado
      thumbnailUrl: "null",
      isVisto: true,
    };
      
    this.videoService.guardarVideos(clase);
    alert("Clase creada");
  }
}