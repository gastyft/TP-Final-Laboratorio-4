import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Clase } from '../models/clase.model';

@Injectable({
  providedIn: 'root'
})
export class alumnoClase {
 url="http://localhost:8080/alumno-clase/"

constructor(private http:HttpClient) {
  
}

 marcarVistoService(idAlumno:number,idClase:number): Observable<string>{
  return this.http.post<string>(this.url+idAlumno+"/marcar-visto/"+idClase,null, { responseType: 'text' as 'json' });
 }

 traerClasesVistas(idAlumno:number): Observable<Clase[]> {
  return this.http.get<Clase[]>(this.url+idAlumno+"/clases-vistas");
 }
}