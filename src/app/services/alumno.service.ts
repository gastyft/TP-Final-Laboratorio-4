import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from '../models/alumno.model';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor(private http: HttpClient) { }

  url="http://localhost:8080/alumnos/"


  getAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(this.url+"get-alumnos-list");
  }
  getAlumnoById(id: number): Observable<Alumno> {
    return this.http.get<Alumno>(this.url+"traer/"+id);
  }
  createAlumno(alumno: Alumno): Observable<string> {
    return this.http.post<string>(this.url+"crear", alumno);
  }
  updateAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(this.url+"editar/"+alumno.id, alumno);
  }
  deleteAlumno(id: number): Observable<string> {
    return this.http.delete<string>(this.url+"borrar/"+id);
  }
  inscribirAlumnoACurso(alumnoId: number, cursoId: number): Observable<string> {
    return this.http.put<string>(this.url+"inscribir/"+alumnoId+"/"+cursoId, null);
  }
  desinscribirAlumnoDeCurso(alumnoId: number, cursoId: number): Observable<string> {
    return this.http.put<string>(this.url+"desinscribir/"+alumnoId+"/"+cursoId, null);
  }
}
