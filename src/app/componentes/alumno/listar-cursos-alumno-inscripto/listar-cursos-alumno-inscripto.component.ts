import { Component, OnInit } from '@angular/core';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";

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

  constructor(private alumnoService: AlumnoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idAlumno = +this.route.snapshot.params['idAlumno'];
 
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
 
