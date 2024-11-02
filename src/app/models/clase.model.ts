

export class Clase {
    id?: number;
    title: string;
    descripcion: string;
    url: string;
     
    
    constructor( title: string, descripcion: string, url: string) {
      this.title = title;
      this.descripcion = descripcion;
      this.url = url;
   
    }
  }