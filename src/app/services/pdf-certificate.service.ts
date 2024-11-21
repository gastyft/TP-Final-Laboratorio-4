import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfCertificateService {

  constructor(private http: HttpClient) { }

  url="http://localhost:8080/generate-certificate";

  getCertificate(nombreAlumno: string, nombreCurso: string, fechaFinalizacion: Date): Observable<ArrayBuffer> {

    const fecha = new Date(fechaFinalizacion);
    const fechaFormateada = fecha.toISOString().split('T')[0];  

    const fechaFinal = fechaFormateada.trim(); 
//El encodeURIComponent toma caracteres especiales y lo pasa a codigo ascii para que no se rompa
    return this.http.get<ArrayBuffer>(`${this.url}?nombreAlumno=${encodeURIComponent(nombreAlumno)}&nombreCurso=${encodeURIComponent(nombreCurso)}&fechaFinalizacion=${fechaFinal}`, {
      responseType: 'arraybuffer' as 'json'   
    });
}

}
