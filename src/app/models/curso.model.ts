import { Clase } from './clase.model';  

export class Curso {
  id?: number;
  title: string;
  descripcion: string;
  clases: Clase[]; 
  constructor( title: string, descripcion: string){
   
    this.title = title;
    this.descripcion = descripcion;
    this.clases = [];
  }
}