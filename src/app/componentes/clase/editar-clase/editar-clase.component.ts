import { Component } from '@angular/core';
import { ClaseService } from '../../../services/clase.service';
import { StorageService } from '../../../services/firebase-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { throws } from 'assert';
import { Curso } from '../../../models/curso.model';
import { Clase } from '../../../models/clase.model';
import { NavProfesorComponent } from "../../profesor/nav-profesor/nav-profesor.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-clase',
  standalone: true,
  imports: [NavProfesorComponent,FormsModule],
  templateUrl: './editar-clase.component.html',
  styleUrl: './editar-clase.component.css'
})
export class EditarClaseComponent {
  titulo: string = '';
  descripcion: string = '';
  linkVideo: string = '';
  video: File | null = null;

  curso!:Curso;
  idCurso!:number;
  cant!: number;
  claseId!:number;
  idProfesor!: number;
  constructor(private claseService: ClaseService, private storageService: StorageService,private route: ActivatedRoute
    ,private cursoService: CursoService,private router: Router) {}
  
  ngOnInit(): void {
    this.idProfesor = +this.route.snapshot.params['idProfesor'];
    this.idCurso = +this.route.snapshot.params['idCurso'];
    this.claseId = +this.route.snapshot.params['claseId'];
    
    this.getClase();
  }

  getClase(){

    this.claseService.getClaseById(this.claseId).subscribe((clase) => {
  
      this.titulo = clase.title;
      this.descripcion = clase.descripcion;
      this.linkVideo = clase.url;
    });
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
        this.editarClase();
      }).catch((error) => {
        console.error("Error al subir el archivo:", error);
      });
    } else if (this.linkVideo.includes("youtube.com")||this.linkVideo.includes("firebasestorage")) {
      this.editarClase();
    } else {
      swal("Atención", "Falta video", "warning");
    }
  }

  private editarClase() {
  
    if (!this.titulo.trim() || !this.descripcion.trim()) {
      swal("Atención", "Todos los campos son obligatorios", "warning");
      return;
    }
    const clase: Clase = {
      id: this.claseId,
      title: this.titulo,
      descripcion: this.descripcion,
      url: this.linkVideo
    };
    if (clase.url.includes("youtube.com") || clase.url.includes("firebasestorage")) {
      this.claseService.updateClase(clase).subscribe(
        data => {
          swal("¡Que bien!", "Clase editada", "success");
          this.router.navigateByUrl(`/principal-profesor/${this.idProfesor}/lista-clases/${this.idCurso}`);
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
