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
      titulo: [this.curso.titulo, Validators.required], 
      descripcion: [this.curso.descripcion, Validators.required]  
    });
 
  }
  guardarCurso(): void {
    
    if (this.updateCurso.valid) {
         
        this.cursoService.updateCurso(this.curso).subscribe(response => {
            console.log('Curso guardado' + response);  //Cambiar por SWAL
             alert("Curso creado ");
         });
    }  
  }
  
   

 
  ngOnInit() {
    this.idCurso = this.route.snapshot.params['id']; // Obtén el idProfesor de la ruta
     
     this.cursoService.getCursoById(this.idCurso).subscribe(cursoGet => this.curso = cursoGet);
  }
}
 
