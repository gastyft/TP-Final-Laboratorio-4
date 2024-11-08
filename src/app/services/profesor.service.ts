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
    return this.http.get<Profesor[]>(this.url);
  }
  getProfesorById(id:number):Observable<Profesor>{
    return this.http.get<Profesor>(this.url+id);
  }

  createProfesor(profesor:Profesor):Observable<string>{
    return this.http.post<string>(this.url,profesor, { responseType: 'text' as 'json' }); 
  }
  updateProfesor(profesor:Profesor,idProfesor:number):Observable<Profesor>{
    return this.http.put<Profesor>(this.url+idProfesor+`?nombre=${profesor.nombre}&apellido=${profesor.apellido}&email=${profesor.email}&edad=${profesor.edad}`,profesor);
  } 
  deleteProfesor(id:number):Observable<string>{
    return this.http.delete<string>(this.url+id, { responseType: 'text' as 'json' });
  }

}
