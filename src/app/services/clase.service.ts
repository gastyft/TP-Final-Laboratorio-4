import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Clase } from '../models/clase.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  constructor(private http:HttpClient) { }

  url="http://localhost:8080/clase/"
  getClases():Observable<Clase[]> {
    return this.http.get<Clase[]>(this.url+"get-clase-list");
  }
  getClaseById(id: number): Observable<Clase> {
    return this.http.get<Clase>(this.url+"get-clase/"+id);
  }
  createClase(clase: Clase): Observable<string> {
    return this.http.post<string>(this.url+"crear", clase);
  }
  updateClase(clase: Clase): Observable<Clase> {
    return this.http.put<Clase>(this.url+"editar/"+clase.id, clase);
  }
  deleteClase(id: number): Observable<string> {
    return this.http.delete<string>(this.url+"borrar/"+id);
  }

}
