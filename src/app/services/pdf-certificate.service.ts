import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfCertificateService {

  constructor(private http: HttpClient) { }

  url="http://localhost:8080/generate-certificate";

  getCertificate(nombreAlumno: string, nombreCurso: string): Observable<ArrayBuffer> {
    return this.http.get<ArrayBuffer>(`${this.url}?nombreAlumno=${encodeURIComponent(nombreAlumno)}&nombreCurso=${encodeURIComponent(nombreCurso)}`, {
      responseType: 'arraybuffer' as 'json'  // Cambia aquí a 'arraybuffer'
    });
  }
  
}
