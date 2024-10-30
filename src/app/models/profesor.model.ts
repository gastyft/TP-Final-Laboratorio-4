import { Curso } from "./curso.model";

export class Profesor {
    id?: number;
   nombre: string;
    apellido: string;
    edad: number;
    email: string;
    cursosQueDicta:Curso[];
    constructor(nombre:string,apellido:string,email:string,edad:number){
      this.nombre = nombre;
      this.apellido = apellido;
      this.email = email;
      this.edad = edad;
      this.cursosQueDicta = [];
   }
   
  }