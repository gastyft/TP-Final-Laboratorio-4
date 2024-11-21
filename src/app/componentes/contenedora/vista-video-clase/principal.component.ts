import { Component } from '@angular/core';
import { ListaComponent } from '../../curso/lista/lista.component';
import { VideoPlayerComponent } from '../../clase/video-player/video-player.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import swal from 'sweetalert';
import { NavAlumnoComponent } from "../../alumno/nav-alumno/nav-alumno.component";
import { TokenService } from '../../../services/token.service';
import { AlumnoCertificateService } from '../../../services/alumno-certificate.service';
 
@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ListaComponent, VideoPlayerComponent, NavAlumnoComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
  
  selectedVideoId: number | null =null; 
  videosVistos: { [key: number]: boolean } = {}; 
  curso!: Curso;
  idAlumno!: number;
  idCurso!: number;
  usuarioId!: number;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService,  
    public sanitizer: DomSanitizer,
    private router: Router,
    private tokenService: TokenService,  
    private alumnoCertificatesService: AlumnoCertificateService, 
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAlumno = +params['idAlumno'];
      
  
  
      this.usuarioId = this.tokenService.getIdEntidad()??0;

    
      if (this.idAlumno !== this.usuarioId) {
       
        this.router.navigateByUrl('/error-404');   
      }
      this.idCurso = +params['idCurso'];
    
      this.cursoService.getCursoById(this.idCurso).subscribe(
        cursoGet => {
          this.curso = cursoGet;
     
        },
        error => {
          swal('Error al obtener el curso', 'No se pudo cargar el curso. Por favor, intenta nuevamente.', 'error');
          this.router.navigate(['/error-404']);  
        }
      );
    });
  }

  onVideoSeleccionado(videoId: number): void {
    this.selectedVideoId = videoId;
  }

  marcarVideoVisto(videoId: number) {
    this.videosVistos[videoId] = true;
    this.checkCursoCompleto();
  }
  
  async checkCursoCompleto() {
    const clasesVistas = this.curso.clases.filter((clase) => this.videosVistos[clase.id!]);
    if (clasesVistas.length === this.curso.clases.length) {
      await this.finalizarCurso();
    }
  }

  async finalizarCurso(): Promise<void> {
    this.alumnoCertificatesService.getCursosFinalizadosById(this.idAlumno).subscribe(data=>{
      const cursoEncontrado = data.find(cursoAuxo => cursoAuxo.id === this.curso.id);
  
      if (!cursoEncontrado) {
        this.alumnoCertificatesService.finalizarCurso(this.idAlumno, this.curso.id!).subscribe(
          (response) => {
            swal("¡Felicitaciones!", "¡Has finalizado el curso  "+ this.curso.titulo +"!", "success");
          },
          (error) => {
            console.error('Error al finalizar el curso', error);
          }
        );
      }
    })
  }
}
