import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
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

  @Input() curso!: Curso;
  @Output() videoSeleccionado = new EventEmitter<number>();
  
 
  
@Input() videosVistos: { [key: number]: boolean } = {};

  
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
    });
  }

  selectVideo(videoId: number): void {
    this.videoSeleccionado.emit(videoId);
  }

}
