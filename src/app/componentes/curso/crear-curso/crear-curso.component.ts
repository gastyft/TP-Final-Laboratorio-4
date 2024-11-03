import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { Clase } from '../../../models/clase.model';
import { NavProfesorComponent } from '../../profesor/nav-profesor/nav-profesor.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, NavProfesorComponent],
  providers:[HttpClientModule],
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  
 
  clases: Clase[] = [];
  crearCurso: FormGroup;
  idProfesor!:number;

  constructor(  private cursoService: CursoService ,private route: ActivatedRoute,private fb: FormBuilder ) {
    this.crearCurso = this.fb.group({
      titulo: ['Tizi', Validators.required], 
      descripcion: ['Un curso para aprender Angular', Validators.required]  
    });
 
  }
  guardarCurso(): void {
    
    if (this.crearCurso.valid) {
        const cursoData = new Curso(this.crearCurso.value.titulo, this.crearCurso.value.descripcion);

        this.cursoService.createCurso(cursoData, 1 /*this.idProfesor*/).subscribe(response => {
            console.log('Curso guardado' + response);  //Cambiar por SWAL
             alert("Curso creado ");
         });
    }  
  }
  
   

 
  ngOnInit() {
    this.idProfesor = this.route.snapshot.params['id']; // Obtén el idProfesor de la ruta
    // Aquí puedes cargar las clases si es necesario, por ejemplo:
    // this.cursoService.getClases().subscribe(clases => this.clases = clases);
  }
}