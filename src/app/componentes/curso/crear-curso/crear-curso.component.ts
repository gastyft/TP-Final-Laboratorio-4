import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { Clase } from '../../../models/clase.model';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink,],
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  
  titulo: FormControl;
  descripcion: FormControl;
  clases: Clase[] = [];
 
  idProfesor!:number;

  constructor(private cursoService: CursoService, private route: ActivatedRoute, ) {
    this.titulo = new FormControl('', Validators.required);
    this.descripcion = new FormControl('', Validators.required);
  }
  ngOnInit() {
    this.idProfesor  = this.route.snapshot.params['id']; 
 
  }

  guardarCurso(): void {
    if (this.titulo.valid && this.descripcion.valid) {
      const cursoData = new Curso(this.titulo.value, this.descripcion.value);
      
      this.cursoService.createCurso(cursoData,this.idProfesor).subscribe(response => {
        
        console.log('Curso guardado', response);  //Cambiar por SWAL
      });
    } else {
      console.log('Formulario no válido');
    }
  }

}
