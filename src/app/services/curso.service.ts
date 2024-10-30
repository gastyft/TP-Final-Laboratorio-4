import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http: HttpClient) { }

  private cursos:Curso[]=[
    {id: 1, title: 'Angular', descripcion: 'Curso de Angular', clases: []},
    {id: 2, title: 'React', descripcion: 'Curso de React', clases: []},
    {id: 3, title: 'Vue', descripcion: 'Curso de Vue', clases:[]},
  ]

  url="http://localhost8080/curso/"
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.url+"get-curso-list");
  }
  getCursoById(id: number): Observable<Curso> {
    return this.http.get<Curso>(this.url+"traer/"+id);
  }
  createCurso(curso: Curso,profesorId: number): Observable<string> {
    return this.http.post<string>(this.url+"crear/"+profesorId, curso);
  }
  updateCurso(curso: Curso): Observable<string> {
    return this.http.put<string>(this.url+"editar/"+curso.id, curso);
  }
  deleteCurso(id: number): Observable<string> {
    return this.http.delete<string>(this.url+"borrar/"+id);
  }

}
