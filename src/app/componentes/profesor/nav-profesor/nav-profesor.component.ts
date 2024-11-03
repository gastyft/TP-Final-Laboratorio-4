import { CommonModule } from '@angular/common';
import { Component, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-nav-profesor',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-profesor.component.html',
  styleUrl: './nav-profesor.component.css'
})
export class NavProfesorComponent {
 
}
