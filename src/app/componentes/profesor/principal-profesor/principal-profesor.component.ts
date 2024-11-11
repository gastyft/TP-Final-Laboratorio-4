import { Component, OnInit } from '@angular/core';
import { NavProfesorComponent } from '../nav-profesor/nav-profesor.component';
import { ListarCursosComponent } from '../listar-cursos/listar-cursos.component';
 
import { ProfesorService } from '../../../services/profesor.service';
import { TokenService } from '../../../services/token.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-principal-profesor',
  standalone: true,
  imports: [NavProfesorComponent, ListarCursosComponent],
  templateUrl: './principal-profesor.component.html',
  styleUrl: './principal-profesor.component.css'
})
export class PrincipalProfesorComponent implements OnInit  {
  idProfesor!:number;
  usuarioId!:number;
  constructor(private tokenService: TokenService, private route: ActivatedRoute,private router:Router){}
  ngOnInit(): void {

  this.idProfesor =+this.route.snapshot.params['idProfesor'];
    
  /*  this.usuarioId = this.tokenService.getIdEntidad()??0;  IMPLEMENTAR EN TODOS LOS COMPONENTES CUANDO ESTE EL LOGIN
  DE PROFESOR FUNCIONANDO CON CAN ACTIVATE

    
    if (this.idProfesor !== this.usuarioId) {
     
      this.router.navigateByUrl('/error-404');   
    } */ 
  }
 

}