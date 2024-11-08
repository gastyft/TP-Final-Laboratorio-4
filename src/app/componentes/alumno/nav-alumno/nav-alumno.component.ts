import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-alumno',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-alumno.component.html',
  styleUrl: './nav-alumno.component.css'
})
export class NavAlumnoComponent {

}
