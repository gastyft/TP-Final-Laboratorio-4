export class nuevoUsuario{
    nombre: string;
    apellido:string;
    edad:number;
     nombreUsuario: string;
     email: string;
     password: string;
 
 
 
     constructor( nombre:string,apellido:string, edad:number,nombreUsuario: string, email: string,password: string,){
         this.nombre=nombre;
         this.apellido=apellido;
         this.edad=edad;
         this.nombreUsuario=nombreUsuario;
         this.email=email;
         this.password=password;
 
 }
 }