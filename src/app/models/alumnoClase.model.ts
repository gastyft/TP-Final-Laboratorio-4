export class AlumnoClase {
    id?: number;
    alumnoId: number;
    claseId: number;
 
  
    constructor(alumnoId: number, claseId: number, visto: boolean) {
      this.alumnoId = alumnoId;
      this.claseId = claseId;
   
    }
  }
  