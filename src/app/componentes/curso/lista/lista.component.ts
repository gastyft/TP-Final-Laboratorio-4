import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { alumnoClase } from '../../../services/alumnoClase.service';
import { TokenService } from '../../../services/token.service';
import { AlumnoCertificateService } from '../../../services/alumno-certificate.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @Output() videoSeleccionado = new EventEmitter<number>();
  
  private _videosVistos: { [key: number]: boolean } = {};
  
  @Input()
  set videosVistos(value: { [key: number]: boolean }) {
    this._videosVistos = value;
    // Llamar a checkCursoCompleto cada vez que videosVistos cambie
    this.checkCursoCompleto();
  }

  get videosVistos(): { [key: number]: boolean } {
    return this._videosVistos;
  }
  
  @Input() curso!: Curso;
  
  idAlumno!: number;
  usuarioId!: number;

  constructor(
    private vistosService: alumnoClase,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
    private alumnoCertificateService: AlumnoCertificateService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.idAlumno = +this.route.snapshot.params['idAlumno'];
    this.usuarioId = this.tokenService.getIdEntidad() ?? 0;

    if (this.idAlumno !== this.usuarioId) {
      this.router.navigateByUrl('/error-404');
    }

    if (this.idAlumno) {
      this.getVistos(this.idAlumno);
    }
  }

  getVistos(idAlumno: number): void {
    this.vistosService.traerClasesVistas(idAlumno).subscribe((clasesVistas) => {
      clasesVistas.forEach((clase) => {
        this.videosVistos[clase.id!] = true;
      });
      
      this.cdr.detectChanges();
    });
  }

  selectVideo(videoId: number): void {
    this.videoSeleccionado.emit(videoId);
  }

  async checkCursoCompleto() {
    if (!this.curso || !this.curso.clases) return;

    const clasesVistas = this.curso.clases.filter((clase) => this.videosVistos[clase.id!]);
    const cursoCompletado = clasesVistas.length === this.curso.clases.length;

    if (cursoCompletado) {
      await this.finalizarCurso();
    }
  }

  async finalizarCurso(): Promise<void> {
    this.alumnoCertificateService.finalizarCurso(this.idAlumno, this.curso.id!).subscribe(
      (response) => {
        swal('¡Felicitaciones!', `¡Has finalizado el curso ${this.curso.titulo}!`, 'success');
      },
      (error) => {
        console.error('Error al finalizar el curso', error);
      }
    );
  }
}
