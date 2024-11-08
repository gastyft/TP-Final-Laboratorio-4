import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfesorService } from '../../../services/profesor.service';
import { CursoService } from '../../../services/curso.service';
import { reload } from 'firebase/auth';

@Component({
  selector: 'app-listar-cursos',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './listar-cursos.component.html',
  styleUrl: './listar-cursos.component.css'
})
export class ListarCursosComponent implements OnInit{
  datosCursos: any[] = [];  // Almacena los cursos del profesor
   datoProfesor:any;
  constructor(private profesorService: ProfesorService, private route: ActivatedRoute, private cursoService: CursoService) {}

  ngOnInit(): void {
    const idProfesor = this.route.snapshot.paramMap.get('idProfesor');  // Obtiene el ID del profesor de la URL
    if (idProfesor) {
      this.profesorService.getProfesorById(+idProfesor).subscribe((profesor) => {
        this.datoProfesor= profesor;
        this.datosCursos = profesor.cursosQueDicta;  // Asigna los cursos a datosCursos
        
      });
    }
  }

  deleteCurso(id_curso: number) {
    this.cursoService.deleteCurso(id_curso).subscribe(
      (response) => {
        swal("Curso y clases eliminadas", "", "success");
       this.ngOnInit();
      },
      (error) => {
        swal("Error al eliminar el curso", "", "error");
      }
    );
  }
  
}