import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
 
    if (!this.tokenService.getToken()) {
       this.router.navigate(['/login']);
       return false;   
    }
 
 
    const expectedRol = route.data['expectedRol'];
    const roles = this.tokenService.getAuthorities();
    let realRol = '';
    if (roles.includes('ROLE_PROFESOR')) {
       realRol = 'ROLE_PROFESOR';
    } else if (roles.includes('ROLE_ALUMNO')) {
       realRol = 'ROLE_ALUMNO';
    }
 
    if (expectedRol && !expectedRol.includes(realRol)) {
       this.router.navigate(['/error-404']);   
       return false;
    }
 
    return true;
 }
 
}