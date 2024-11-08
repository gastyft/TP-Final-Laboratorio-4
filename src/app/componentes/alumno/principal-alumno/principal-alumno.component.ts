import { Component } from '@angular/core';
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { ListarCursosAlumnoComponent } from "../listar-cursos-alumno/listar-cursos-alumno.component";

@Component({
  selector: 'app-principal-alumno',
  standalone: true,
  imports: [NavAlumnoComponent, ListarCursosAlumnoComponent],
  templateUrl: './principal-alumno.component.html',
  styleUrl: './principal-alumno.component.css'
})
export class PrincipalAlumnoComponent {

}
