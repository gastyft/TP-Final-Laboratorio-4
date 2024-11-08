import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Curso } from '../../../models/curso.model';
import { alumnoClase } from '../../../services/alumnoClase.service';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [],
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {
  @Output() videoSeleccionado = new EventEmitter<number>(); 
  @Input() videosVistos: { [key: number]: boolean } = {};
  @Input() curso!: Curso;

  idAlumno!: number;

  constructor(private vistosService: alumnoClase, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const idAlumnoParam = this.route.snapshot.paramMap.get('idAlumno');  // Obtiene el ID del alumno de la URL
    if (idAlumnoParam) {
      this.idAlumno = +idAlumnoParam;
      this.getVistos(this.idAlumno);  // Llama a getVistos con el idAlumno
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
