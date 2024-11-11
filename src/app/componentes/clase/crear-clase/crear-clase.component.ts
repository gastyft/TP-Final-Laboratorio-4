import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../services/firebase-storage.service';
import { VideoService } from '../../../services/video.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Clase } from '../../../models/clase.model';
import swal from 'sweetalert';
import { ActivatedRoute } from '@angular/router';
import { ClaseService } from '../../../services/clase.service';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { NavProfesorComponent } from "../../profesor/nav-profesor/nav-profesor.component";


@Component({
  selector: 'app-crear-clase',
  standalone:true,
  imports: [CommonModule, FormsModule, NavProfesorComponent],
  templateUrl: './crear-clase.component.html',
  styleUrls: ['./crear-clase.component.css'],
})
export class CrearClaseComponent implements OnInit{
  titulo: string = '';
  descripcion: string = '';
  linkVideo: string = '';
  video: File | null = null;

  curso!:Curso;
  idCurso!:number;
  cant!: number;
  constructor(private claseService: ClaseService, private storageService: StorageService,private route: ActivatedRoute
    ,private cursoService: CursoService,) {}
  
  ngOnInit(): void {
    this.idCurso = +this.route.snapshot.params['idCurso'];

    if(this.idCurso){
     this.contarCantidadClases();
    }
  }


 
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
        this.linkVideo = url;
        this.crearClase();
      }).catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
    } else if (this.linkVideo.includes("youtube.com")||this.linkVideo.includes("firebasestorage")) {
      this.crearClase();
    } else {
      swal("Atención", "Falta video", "warning");
    }
  }

  private crearClase() {
    const clase: Clase = {
      title: this.titulo,
      descripcion: this.descripcion,
      url: this.linkVideo
    };

    if (clase.url.includes("youtube.com") || clase.url.includes("firebasestorage")) {
      this.claseService.createClase(clase, this.idCurso).subscribe(
        data => {
          swal("Good job!", "Clase creada", "success");
          this.resetForm();
          this.contarCantidadClases();
        },
        error => {
          swal("ERROR", "No se puedo guardar la clase", "error");
        }
      );
    }
  }

  private resetForm() {
    this.titulo = '';
    this.descripcion = '';
    this.linkVideo = '';
    this.video = null;
  }

  contarCantidadClases(): void {
    this.cursoService.getCursoById(this.idCurso).subscribe(
      data => {
        this.curso = data;
        this.cant = this.curso.clases ? this.curso.clases.length + 1 : 1;
      },
      error => {
        console.error("Error al obtener el curso:", error);
      }
    );
  }
}