import { Injectable } from '@angular/core';
import { Curso } from '../models/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor() { }

  private cursos:Curso[]=[
    {id: 1, title: 'Angular', descripcion: 'Curso de Angular', listaVideos: []},
    {id: 2, title: 'React', descripcion: 'Curso de React', listaVideos: []},
    {id: 3, title: 'Vue', descripcion: 'Curso de Vue', listaVideos: []}
    
  ]
}
