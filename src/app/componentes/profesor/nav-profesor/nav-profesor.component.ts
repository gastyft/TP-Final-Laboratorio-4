import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-profesor',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-profesor.component.html',
  styleUrl: './nav-profesor.component.css'
})
export class NavProfesorComponent {

}
