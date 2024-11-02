import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
 

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './editar-perfil.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  @ViewChild('editProfileForm', { static: false }) form!: ElementRef;
}
