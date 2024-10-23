import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './crear-curso.component.html',
  styleUrl: './crear-curso.component.css'
})
export class CrearCursoComponent {
  titulo: string='';
  descripcion:string='';

  guardarCurso(){ //LLamar del servicio curso.service a guardar en la lista 


  }

}
