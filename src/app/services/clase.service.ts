import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clase } from '../models/clase.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8080/clase"
  getClases():Observable<Clase[]> {
    return this.http.get<Clase[]>(this.url);
  }
  getClaseById(id: number): Observable<Clase> {
    return this.http.get<Clase>(this.url+"/"+id);
  }
  createClase(clase: Clase,idCurso:number): Observable<string> {
    return this.http.post<string>(this.url+"/"+idCurso, clase, { responseType: 'text' as 'json' });
  }
  updateClase(clase: Clase): Observable<Clase> {
    return this.http.put<Clase>(this.url+"/"+clase.id+`?title=${clase.title}&descripcion=${clase.descripcion}&url=${clase.url}`, clase);
  }
  deleteClase(id: number): Observable<string> {
    return this.http.delete<string>(this.url+"/"+id, { responseType: 'text' as 'json' }); 
  }

}
