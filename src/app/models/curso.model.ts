import { Clase } from './clase.model';  

export class Curso {
  id?: number;
  title: string;
  descripcion: string;
  clases: Clase[]; 
  constructor(id: number, title: string, descripcion: string){
    this.id = id;
    this.title = title;
    this.descripcion = descripcion;
    this.clases = [];
  }
}