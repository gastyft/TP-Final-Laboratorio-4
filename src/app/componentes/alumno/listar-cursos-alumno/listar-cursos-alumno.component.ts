import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { error } from 'console';
import { RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-listar-cursos-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-cursos-alumno.component.html',
  styleUrl: './listar-cursos-alumno.component.css'
})
export class ListarCursosAlumnoComponent implements OnInit {

  constructor(private  cursoService :CursoService){}

  datosCursos:Curso[]=[];
ngOnInit(): void {
 this.getCursos();
  
} 

getCursos(){
  this.cursoService.getCursos().subscribe(
    (data) => {
      this.datosCursos = data;
    },
    (error) => {
      console.error('Error al obtener cursos:', error);
    }
  );
}

}
  
 
