import { Clase } from './clase.model';  

export class Curso {
  id?: number;
  titulo: string;
  descripcion: string;
  clases: Clase[]; 
  constructor( titulo: string, descripcion: string){
   
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.clases = [];
  }
}