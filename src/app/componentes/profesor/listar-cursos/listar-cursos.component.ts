import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProfesorService } from '../../../services/profesor.service';
import { CursoService } from '../../../services/curso.service';
import { reload } from 'firebase/auth';
import { TokenService } from '../../../services/token.service';

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
   usuarioId!: number;
  idProfesor!: number;
  constructor(private profesorService: ProfesorService, private route: ActivatedRoute, private cursoService: CursoService,
    private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
 
   this.idProfesor =+this.route.snapshot.params['idProfesor'];
    this.usuarioId = this.tokenService.getIdEntidad()??0; 

    if (this.idProfesor !== this.usuarioId) {
     
      this.router.navigateByUrl('/error-404');   
    } 
    if (this.idProfesor) {
      this.profesorService.getProfesorById(this.idProfesor).subscribe((profesor) => {
        this.datoProfesor= profesor;
        this.datosCursos = profesor.cursosQueDicta;   
        
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
        swal("Error al eliminar el curso", "Posee alumnos inscriptos", "error");
      }
    );
  }
  
}