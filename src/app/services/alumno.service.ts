import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  url="http://localhost:8080/alumno/"


  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.url);
  }
  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.url+id);
  }
  createAlumno(alumno: Alumno): Observable<string> {
    return this.http.post<string>(this.url, alumno, { responseType: 'text' as 'json' });
  }
  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(this.url+alumno.id, alumno);
  }
  deleteAlumno(id: number): Observable<string> {
    return this.http.delete<string>(this.url+id, { responseType: 'text' as 'json' });
  }
  inscribirAlumnoACurso(alumnoId: number, cursoId: number): Observable<string> {
    return this.http.put<string>(this.url+alumnoId+"inscribir/"+cursoId, null, { responseType: 'text' as 'json' });
  }
  desinscribirAlumnoDeCurso(alumnoId: number, cursoId: number): Observable<string> {
    return this.http.put<string>(this.url+alumnoId+"desinscribir/"+cursoId, null, { responseType: 'text' as 'json' });
  }
}
