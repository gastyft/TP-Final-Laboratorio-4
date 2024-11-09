import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { loginUsuario } from '../models/loginUsuario.model';
import { jwtDto } from '../models/jwtDTO.model';
import { nuevoUsuario } from '../models/nuevoUsuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = "https://carrito-gastyft.koyeb.app/";

  constructor(private http: HttpClient, private router: Router) {}

  public nuevo(nuevoUsuario: nuevoUsuario): Observable<any> {
    return this.http.post<any>(this.url + 'auth/nuevo', nuevoUsuario);
  }

  public login(loginusuario: loginUsuario): Observable<jwtDto> {
    return this.http.post<jwtDto>(this.url+ 'auth/login', loginusuario);
  }
}