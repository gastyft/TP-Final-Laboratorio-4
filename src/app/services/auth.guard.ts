import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    // Verifica si el token está presente
    if (!this.tokenService.getToken()) {
       this.router.navigate(['/login']);
       return false;  // Redirige al login si no hay token
    }
 
    // Verifica el rol del usuario
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    let realRol = '';
    if (roles.includes('ROLE_PROFESOR')) {
       realRol = 'ROLE_PROFESOR';
    } else if (roles.includes('ROLE_ALUMNO')) {
       realRol = 'ROLE_ALUMNO';
    }
 
    if (expectedRol && !expectedRol.includes(realRol)) {
       this.router.navigate(['/error404']);  // Redirige si el rol no coincide
       return false;
    }
 
    return true;
 }
 
}