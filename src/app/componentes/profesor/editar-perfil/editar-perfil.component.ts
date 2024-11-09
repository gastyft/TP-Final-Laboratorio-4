import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavProfesorComponent } from '../nav-profesor/nav-profesor.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../../../services/profesor.service';
import { Profesor } from '../../../models/profesor.model';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [ CommonModule, NavProfesorComponent, ReactiveFormsModule],
  templateUrl: './editar-perfil.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent {
  editProfileForm: FormGroup;
  profesor!: Profesor;
idProfesor!: any;
 
  constructor(
    private fb: FormBuilder,
    private profesorService: ProfesorService,
    private route: ActivatedRoute
  ) {
    // Inicializamos el formulario sin valores porque los datos de `profesor` aún no están disponibles
    this.editProfileForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, ]], //Validators.email rompe el codigo

      
    });
  }

  ngOnInit(): void {
     this.idProfesor = this.route.snapshot.paramMap.get('idProfesor');
    if (this.idProfesor) {
      this.profesorService.getProfesorById(+this.idProfesor).subscribe((profe) => {
        this.profesor = profe;
      
        this.editProfileForm.patchValue({
          nombre: this.profesor.nombre,
          apellido: this.profesor.apellido,
          email: this.profesor.email
        });
      });
    }
    
  }

  onSubmit() {
    console.log('Formulario enviado'); 
    if (this.editProfileForm.valid) {
      console.log(this.editProfileForm.value);
    
     
      this.profesor.nombre = this.editProfileForm.get('nombre')?.value;
      console.log(this.profesor.nombre);
      this.profesor.apellido = this.editProfileForm.get('apellido')?.value;
      this.profesor.email = this.editProfileForm.get('email')?.value;
  
      // Llamamos al servicio para actualizar el profesor
      this.profesorService.updateProfesor(this.profesor, this.idProfesor).subscribe(
        (response) => {
          swal("Datos Editados", "", "success");
        },
        (error) => {
          swal("Error al editar los datos", "", "error");
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
  

}
