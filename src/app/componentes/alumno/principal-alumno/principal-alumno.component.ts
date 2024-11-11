import { Component, OnInit } from '@angular/core';
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { ListarCursosAlumnoComponent } from "../listar-cursos-alumno/listar-cursos-alumno.component";
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-principal-alumno',
  standalone: true,
  imports: [NavAlumnoComponent, ListarCursosAlumnoComponent],
  templateUrl: './principal-alumno.component.html',
  styleUrl: './principal-alumno.component.css'
})
export class PrincipalAlumnoComponent implements OnInit{
  idAlumno!: number;
  usuarioId!: number;
  constructor(private tokenService: TokenService, private router: Router,private route: ActivatedRoute) { }
  ngOnInit(): void {
    
    this.idAlumno = +this.route.snapshot.paramMap.get('idAlumno')!;   

  
    this.usuarioId = this.tokenService.getIdEntidad()??0;

    
    if (this.idAlumno !== this.usuarioId) {
     
      this.router.navigateByUrl('/error-404');   
    }
  }


}
