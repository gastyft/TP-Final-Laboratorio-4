import { Component, OnInit } from '@angular/core';
import { Clase } from '../../../models/clase.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { NavProfesorComponent } from '../../profesor/nav-profesor/nav-profesor.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-curso',
  standalone: true,
  imports: [NavProfesorComponent,CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './editar-curso.component.html',
  styleUrl: './editar-curso.component.css'
})
export class EditarCursoComponent implements OnInit {

 
  clases: Clase[] = [];
 updateCurso: FormGroup;
  idProfesor!:number;
  idCurso: any;
  curso!:Curso;
  constructor(  private cursoService: CursoService ,private route: ActivatedRoute,private fb: FormBuilder ) {
    this.updateCurso = this.fb.group({
      titulo: ['', Validators.required],  // Inicializa como vacío
      descripcion: ['', Validators.required]  // Inicializa como vacío
    });
  }

  ngOnInit() {
    this.idCurso = this.route.snapshot.params['id'];

    this.cursoService.getCursoById(this.idCurso).subscribe(
      (cursoGet) => {
        this.curso = cursoGet;
        // Inicializa el formulario con los datos del curso
        this.updateCurso.patchValue({
          titulo: this.curso.titulo,
          descripcion: this.curso.descripcion
        });
      },
      (error) => {
        console.error('Error al cargar el curso', error);
      }
    );
  }
  guardarCurso(): void {
    if (this.updateCurso.valid) {
      this.curso.titulo = this.updateCurso.value.titulo;
      this.curso.descripcion = this.updateCurso.value.descripcion;
      console.log(this.idCurso);
      this.cursoService.updateCurso(this.curso, this.idCurso).subscribe(
        response => {
          
          console.log('Curso guardado', response); // Cambiar por SWAL
          alert("Curso actualizado");
        },
        error => {
          console.error('Error al guardar el curso', error);
          alert("Error al actualizar el curso");
        }
      );
    }
  }
  }
  
   

 
