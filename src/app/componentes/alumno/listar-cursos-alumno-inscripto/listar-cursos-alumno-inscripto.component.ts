import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AlumnoService } from '../../../services/alumno.service';
import { Alumno } from '../../../models/alumno.model';
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { TokenService } from '../../../services/token.service';
import { alumnoClase } from '../../../services/alumnoClase.service';
import { PdfCertificateService } from '../../../services/pdf-certificate.service';

@Component({
  selector: 'app-listar-cursos-alumno-inscripto',
  standalone: true,
  imports: [CommonModule, NavAlumnoComponent,RouterLink],
  templateUrl: './listar-cursos-alumno-inscripto.component.html',
  styleUrl: './listar-cursos-alumno-inscripto.component.css'
})export class ListarCursosAlumnoInscriptoComponent implements OnInit {
  idAlumno!: number;
  idCurso!:number;
  datosAlumno!: Alumno;
  usuarioId!:number;
  isCompletado!: boolean;
  cursosCompletados: { [key: number]: boolean } = {};
  verificacionCompletada = false;

  constructor(private alumnoService: AlumnoService, private route: ActivatedRoute,
    private tokenService:TokenService,private router:Router, private alumnoClaseService: alumnoClase,private pdfService:PdfCertificateService) {}

  ngOnInit(): void {
    this.idAlumno = +this.route.snapshot.params['idAlumno'];
    this.usuarioId = this.tokenService.getIdEntidad()??0;

    
    if (this.idAlumno !== this.usuarioId) {
     
      this.router.navigateByUrl('/error-404');   
    }
    
    

    this.getCursosInscripto(this.idAlumno);
  
  }

  getCursosInscripto(idAlumno: number) {
    this.alumnoService.getAlumnoById(idAlumno).subscribe(
      async (data) => {
        this.datosAlumno = data;
        await this.verificarCursosCompletos();
        this.verificacionCompletada = true; 
      },
      (error) => {
        console.error('Error al obtener cursos:', error);
      }
    );
  }


  async verificarCursosCompletos() {
    for (const curso of this.datosAlumno.cursosInscritos) {
      if (curso.id) {
        this.cursosCompletados[curso.id] = await this.checkCursoCompleto(curso.id);
      }
    }
    this.verificacionCompletada = true;  
  }

  async checkCursoCompleto(idCurso: number): Promise<boolean> {
    const curso = this.datosAlumno.cursosInscritos.find(curso => curso.id === idCurso);
    if (!curso) {
      console.error(`Curso con id ${idCurso} no encontrado en los cursos inscritos del alumno.`);
      return false;
    }
    const clasesVistas = await this.alumnoClaseService.traerClasesVistas(this.idAlumno).toPromise();
    const clasesVistasDelCurso = curso.clases.filter((clase) =>
      clasesVistas?.some((vista) => vista.id === clase.id)
    );
    return clasesVistasDelCurso.length === curso.clases.length;
  }

finalizarCurso(){
  
}
  


  
}