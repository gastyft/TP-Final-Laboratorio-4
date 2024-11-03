import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProfesorService } from '../../../services/profesor.service';

@Component({
  selector: 'app-listar-cursos',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './listar-cursos.component.html',
  styleUrl: './listar-cursos.component.css'
})
export class ListarCursosComponent implements OnInit{
  datosCursos: any[] = [];  // Almacena los cursos del profesor
   
  constructor(private profesorService: ProfesorService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idProfesor = this.route.snapshot.paramMap.get('id');  // Obtiene el ID del profesor de la URL
    if (idProfesor) {
      this.profesorService.getProfesorById(+idProfesor).subscribe((profesor) => {
        this.datosCursos = profesor.cursosQueDicta;  // Asigna los cursos a datosCursos
      });
    }
  }
}