import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { AlumnoCertificateService } from '../../../services/alumno-certificate.service';
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { CommonModule } from '@angular/common';
import { Alumno } from '../../../models/alumno.model';
import { AlumnoService } from '../../../services/alumno.service';
import { PdfCertificateService } from '../../../services/pdf-certificate.service';

@Component({
  selector: 'app-mis-certificados',
  standalone: true,
  imports: [NavAlumnoComponent,CommonModule,],
  templateUrl: './mis-certificados.component.html',
  styleUrl: './mis-certificados.component.css'
})
export class MisCertificadosComponent implements OnInit{


constructor(private route:ActivatedRoute, private tokenService: TokenService,private router: Router,
private alumnoCertificateService: AlumnoCertificateService, private alumnoService: AlumnoService,
 private pdfService: PdfCertificateService, ){}

idAlumno!:number;
usuarioId!:number;
certificados:any;

ngOnInit(): void {
  this.idAlumno = +this.route.snapshot.params['idAlumno'];
  this.usuarioId = this.tokenService.getIdEntidad()??0;
  
  if (this.idAlumno !== this.usuarioId) {
   
    this.router.navigateByUrl('/error-404');   
  }
  this.getCertificados();

}

getCertificados(){

  this.alumnoCertificateService.getCursosFinalizadosById(this.idAlumno).subscribe((response)=>{
    this.certificados = response;
  },(err)=>{
      console.error('Error al obtener los certificados:', err);
  });   

}

  
  generarCertificado(nombreCurso: string) {
    const alumno = Alumno;
    this.alumnoService.getAlumnoById(this.idAlumno).subscribe(data => {
  
      this.pdfService.getCertificate(data.nombre + " " + data.apellido, nombreCurso/*pasar fecha*/).subscribe(
        (pdfArrayBuffer: ArrayBuffer) => {
          // Convierte el ArrayBuffer a un Blob de tipo 'application/pdf'
          const pdfBlob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
  
          // Verifica que sea un archivo PDF
          if (pdfBlob.type === 'application/pdf') {
            const pdfUrl = URL.createObjectURL(pdfBlob);
            window.open(pdfUrl);  // Abre el PDF en una nueva ventana
          } else {
            console.error('El tipo de archivo recibido no es un PDF, es de tipo:', pdfBlob.type);
          }
        },
        (error) => {
          console.error('Error al obtener el PDF', error);
        }
      );
    },
    error => {
      console.error('Error al obtener los datos del alumno', error);
    });
  }
  


}
