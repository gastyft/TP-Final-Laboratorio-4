import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-listar-cursos-alumno-inscripto',
  standalone: true,
  imports: [CommonModule, NavAlumnoComponent,RouterLink],
  templateUrl: './listar-cursos-alumno-inscripto.component.html',
  styleUrl: './listar-cursos-alumno-inscripto.component.css'
})export class ListarCursosAlumnoInscriptoComponent implements OnInit {
  idAlumno!: number;
  idCurso!:number;
  datosAlumno!: Alumno;
  usuarioId!:number;
  constructor(private alumnoService: AlumnoService, private route: ActivatedRoute,private tokenService:TokenService,private router:Router) {}

  ngOnInit(): void {
    this.idAlumno = +this.route.snapshot.params['idAlumno'];
    this.usuarioId = this.tokenService.getIdEntidad()??0;

    
    if (this.idAlumno !== this.usuarioId) {
     
      this.router.navigateByUrl('/error-404');   
    }
  

    this.getCursosInscripto(this.idAlumno);
  }

  getCursosInscripto(idAlumno: number) {
    this.alumnoService.getAlumnoById(idAlumno).subscribe(
      (data) => {
        this.datosAlumno = data;
        console.log(this.datosAlumno);
      },
      (error) => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }
}
 
