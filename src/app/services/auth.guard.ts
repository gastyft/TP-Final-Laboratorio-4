import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data['expectedRol']; // Rol esperado en la ruta
    const roles = this.tokenService.getAuthorities();
    const idEntidad = this.tokenService.getIdEntidad(); // ID del usuario en el token

    // Determinamos el rol del usuario desde el token
    let realRol = '';
    if (roles.includes('ROLE_PROFESOR')) {
      realRol = 'profesor';
    } else if (roles.includes('ROLE_ALUMNO')) {
      realRol = 'alumno';
    }

    // Verificamos si el token está presente y si el rol coincide con el esperado
    if (!this.tokenService.getToken() || !expectedRol.includes(realRol)) {
      this.router.navigate(['/login']); // Redirigir a la página de login
      return false;
    }

    // Verificación del ID: Asegurarnos de que el ID en la ruta coincida con el ID del usuario
    const idRuta = +route.params['idAlumno'] || +route.params['idProfesor']; // Dependiendo de la ruta

    if (idRuta && idRuta !== idEntidad) {
      this.router.navigate(['/access-denied']); // Redirigir a una página de acceso denegado
      return false;
    }

    // Si todo es correcto, redirigimos según el rol
    if (realRol === 'profesor' && idEntidad) {
      this.router.navigate([`/principal-profesor/${idEntidad}`]);
    } else if (realRol === 'alumno' && idEntidad) {
      this.router.navigate([`/principal-alumno/${idEntidad}`]);
    }

    return true;
  }
}
