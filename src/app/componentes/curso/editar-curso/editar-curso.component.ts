import { Component, OnInit } from '@angular/core';
import { Clase } from '../../../models/clase.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CursoService } from '../../../services/curso.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { NavProfesorComponent } from '../../profesor/nav-profesor/nav-profesor.component';
import { CommonModule } from '@angular/common';
import swal from 'sweetalert';

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
  constructor(  private cursoService: CursoService ,private route: ActivatedRoute,private fb: FormBuilder,private router:Router ) {
    this.updateCurso = this.fb.group({
      titulo: ['', Validators.required],  // Inicializa como vacío
      descripcion: ['', Validators.required]  // Inicializa como vacío
    });
  }

  ngOnInit() {
    this.idProfesor = this.route.snapshot.params['idProfesor']; // ID del profesor
    this.idCurso = this.route.snapshot.params['idCurso']; // ID del curso

    this.cursoService.getCursoById(this.idCurso).subscribe(
      (cursoGet) => {
        this.curso = cursoGet;
       // ESTA ES LA FORMA PARA RENDERIZAR EL FORMULARIO 
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
          
          
          swal("Curso Editado","","success");
          this.router.navigate(['principal-profesor', this.idProfesor]);
        },
        error => {
          console.error('Error al guardar el curso', error);
          swal("Error al editar el curso","","error");
          return;
        }
      );
    }
  }
  }
  
   

 
