 
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { Alumno } from '../../../models/alumno.model';
 
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoService } from "../../../services/alumno.service";
import { CommonModule } from "@angular/common";
@Component({
  selector: 'app-editar-perfil-alumno',
  standalone: true,
  imports: [NavAlumnoComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './editar-perfil-alumno.component.html',
  styleUrl: './editar-perfil-alumno.component.css'
})
export class EditarPerfilAlumnoComponent {
  editProfileForm: FormGroup;
  alumno!: Alumno;
idAlumno!: any;
 
  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
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
     this.idAlumno = this.route.snapshot.paramMap.get('idAlumno');
    if (this.idAlumno) {
      this.alumnoService.getAlumnoById(+this.idAlumno).subscribe((alum) => {
        this.alumno = alum;
      
        this.editProfileForm.patchValue({
          nombre: this.alumno.nombre,
          apellido: this.alumno.apellido,
          email: this.alumno.email
        });
      });
    }
    
  }

  onSubmit() {
    console.log('Formulario enviado'); 
    if (this.editProfileForm.valid) {
      console.log(this.editProfileForm.value);
    
     
      this.alumno.nombre = this.editProfileForm.get('nombre')?.value;
      console.log(this.alumno.nombre);
      this.alumno.apellido = this.editProfileForm.get('apellido')?.value;
      this.alumno.email = this.editProfileForm.get('email')?.value;
  
    
      this.alumnoService.updateAlumno(this.alumno, this.idAlumno).subscribe(
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