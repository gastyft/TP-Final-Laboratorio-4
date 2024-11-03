import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavProfesorComponent } from '../nav-profesor/nav-profesor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [RouterLink,CommonModule,NavProfesorComponent,ReactiveFormsModule,],
  templateUrl: './editar-perfil.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {
  editProfileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editProfileForm = this.fb.group({
      nombre: ['Tizi', Validators.required], // EN las comillas vacias rellenar los campos con los datos del profesor
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.editProfileForm.valid) {
      console.log(this.editProfileForm.value);
      // Aquí puedes agregar la lógica para guardar los cambios
    } else {
      console.log('Formulario no válido');
    }
  }
}
 
