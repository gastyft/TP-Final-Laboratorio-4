import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.css'
})
export class Error404Component  implements OnInit {
  rol: string = '';
  idEntidad: number = 0;
  routerLink: string = '';

  constructor(private tokenService: TokenService, private router: Router) {}

  ngOnInit(): void {
 
    if (!this.tokenService.getToken()) {
      
      this.router.navigate(['/login']);
      return;  
    }

    // Si el token existe, obtenemos el rol y el idEntidad
    this.rol = this.tokenService.getAuthorities().includes('ROLE_PROFESOR') ? 'profesor' : 'alumno';
    this.idEntidad = this.tokenService.getIdEntidad() ?? 0;


    // Construimos el routerLink basado en el rol y el ID
    if (this.rol === 'profesor') {
      this.routerLink = `/principal-profesor/${this.idEntidad}`;
    } else if (this.rol === 'alumno') {
      this.routerLink = `/principal-alumno/${this.idEntidad}`;
    }
  }
}