import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ListaComponent } from '../../curso/lista/lista.component';
import { VideoPlayerComponent } from '../../clase/video-player/video-player.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Error404Component } from "../error404/error404.component";
import { DomSanitizer } from '@angular/platform-browser';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [  ListaComponent, VideoPlayerComponent,],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})

export class PrincipalComponent {
  
  selectedVideoId: number | null =null; 
  videosVistos: { [key: number]: boolean } = {}; 
  curso!: Curso;
  idAlumno!: number;
  idCurso!: number;

  constructor(
    private route: ActivatedRoute,
    private cursoService: CursoService, // Asume que existe un servicio para obtener el curso
    public sanitizer: DomSanitizer,
    private router: Router  // Asume que existe un router para redireccionar a las páginas
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idAlumno = +params['idAlumno'];
      this.idCurso = +params['idCurso'];
    
      this.cursoService.getCursoById(this.idCurso).subscribe(
        cursoGet => {
          this.curso = cursoGet;
     
        },
        error => {
          swal('Error al obtener el curso', 'No se pudo cargar el curso. Por favor, intenta nuevamente.', 'error');
          this.router.navigate(['/error404']); // Redirige a la página de error 404
        }
      );
    });
  }

  onVideoSeleccionado(videoId: number): void {
    this.selectedVideoId = videoId;
  }

  marcarVideoVisto(videoId: number) {
    this.videosVistos[videoId] = true;
    
  }
}
