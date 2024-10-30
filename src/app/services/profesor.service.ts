import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profesor } from '../models/profesor.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  url="http://localhost:8080/profesor/"
  constructor(private http: HttpClient) { }

 public getProfesores():Observable<Profesor[]>{
    return this.http.get<Profesor[]>(this.url+"get-profesor-list");
  }
  getProfesorById(id:number):Observable<Profesor>{
    return this.http.get<Profesor>(this.url+"traer/"+id);
  }

  createProfesor(profesor:Profesor):Observable<string>{
    return this.http.post<string>(this.url+"crear",profesor);
  }
  updateProfesor(profesor:Profesor):Observable<Profesor>{
    return this.http.put<Profesor>(this.url+"editar/"+profesor.id,profesor);
  }
  deleteProfesor(id:number):Observable<string>{
    return this.http.delete<string>(this.url+"/borrar/"+id);
  }

}
