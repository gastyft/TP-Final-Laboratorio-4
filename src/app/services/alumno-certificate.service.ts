import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { Observable } from 'rxjs';
import { json } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class AlumnoCertificateService {


  url="http://localhost:8080/alumno-certificate"
  constructor(private http: HttpClient) { }

  getCursosFinalizadosById(idAlumno:number): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url+"/"+idAlumno);
     }

     finalizarCurso(idAlumno:number, idCurso:number): Observable<string> {
      return this.http.post<string>(this.url+"/"+idAlumno+"/"+idCurso,  { responseType: 'text' as 'json' } );
     }

}
