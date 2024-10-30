import { Curso } from "./curso.model";

export class Alumno {
    id?: number;
    nombre: string;
     apellido: string;
     email: string;
     edad: number;
     cursosInscritos:Curso[];

     constructor(nombre:string,apellido:string,email:string,edad:number){
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.edad = edad;
        this.cursosInscritos = [];
     }
     
  }


