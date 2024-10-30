

export class Clase {
    id?: number;
    title: string;
    descripcion: string;
    url: string;
    isVisto: boolean;  //Ver como hacer la clase vista para cada alumno
    
    constructor( title: string, descripcion: string, url: string) {
      this.title = title;
      this.descripcion = descripcion;
      this.url = url;
      this.isVisto = false; 
    }
  }