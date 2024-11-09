import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { error } from 'console';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { AlumnoService } from '../../../services/alumno.service';

@Component({
  selector: 'app-listar-cursos-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-cursos-alumno.component.html',
  styleUrl: './listar-cursos-alumno.component.css'
})
export class ListarCursosAlumnoComponent implements OnInit {

  constructor(private  cursoService :CursoService,private alumnoService:AlumnoService,private route: ActivatedRoute){}

  datosCursos:Curso[]=[];
  idAlumno!:number;

ngOnInit(): void {

  this.idAlumno = +this.route.snapshot.params['idAlumno'];
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
inscribirseCurso(idCursoIns: number | undefined) {
  if (idCursoIns === undefined) {
    swal("Error", "No se puede inscribir sin un ID de curso válido", "error");
    return;
  } else {
    this.alumnoService.inscribirAlumnoACurso(this.idAlumno, idCursoIns).subscribe(
      (data) => {
        console.log(data);
        swal("Se inscribió al curso correctamente", "", "success");
      },
      (error) => {
        console.log("Error completo:", error);
        if (error.status === 404) {
          swal("Ya se encuentra inscripto", "", "error");
        } else {
          swal("Error al inscribirse al curso", "", "error");
        }
      }
    );
  }
}



}
  
 
