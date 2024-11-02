import { Component } from '@angular/core';
import { NavProfesorComponent } from '../nav-profesor/nav-profesor.component';
import { ListarCursosComponent } from '../listar-cursos/listar-cursos.component';

@Component({
  selector: 'app-principal-profesor',
  standalone: true,
  imports: [NavProfesorComponent, ListarCursosComponent],
  templateUrl: './principal-profesor.component.html',
  styleUrl: './principal-profesor.component.css'
})
export class PrincipalProfesorComponent {

}
