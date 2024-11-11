import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { error } from 'console';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { AlumnoService } from '../../../services/alumno.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-listar-cursos-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-cursos-alumno.component.html',
  styleUrl: './listar-cursos-alumno.component.css'
})
export class ListarCursosAlumnoComponent implements OnInit {

  constructor(private  cursoService :CursoService,private alumnoService:AlumnoService,private route: ActivatedRoute,
    private router: Router,
    private tokenService: TokenService,
 
  ){}

  datosCursos:Curso[]=[];
  idAlumno!:number;
  usuarioId!:number;
ngOnInit(): void {

  this.idAlumno = +this.route.snapshot.params['idAlumno'];
  this.usuarioId = this.tokenService.getIdEntidad()??0;

    
  if (this.idAlumno !== this.usuarioId) {
   
    this.router.navigateByUrl('/error-404');   
  }


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
        if (error.status === 409) {
          swal("Ya se encuentra inscripto", "", "error");
        } else {
          swal("Error al inscribirse al curso", "", "error");
        }
      }
    );
  }
}



}
  
 
