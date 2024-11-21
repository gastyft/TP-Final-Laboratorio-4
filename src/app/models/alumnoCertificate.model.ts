export class AlumnoCertificate {
    id?: number;
    alumnoId: number;
    cursoId: number;
    fechaFinalizacion: Date;
 
  
    constructor(alumnoId: number, cursoId: number,fechaFinalizacion: Date) {
      this.alumnoId = alumnoId;
      this.cursoId = cursoId;
      this.fechaFinalizacion = fechaFinalizacion;
   
    }
}