 
import { NavAlumnoComponent } from "../nav-alumno/nav-alumno.component";
import { Alumno } from '../../../models/alumno.model';
 
import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlumnoService } from "../../../services/alumno.service";
import { CommonModule } from "@angular/common";
import { TokenService } from "../../../services/token.service";
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
idAlumno!: number;
 usuarioId!:number;

  constructor(
    private fb: FormBuilder,
    private alumnoService: AlumnoService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private router: Router,
  ) {

    this.editProfileForm = this.fb.group({
      nombre: ['',[ Validators.required, Validators.pattern('[a-zA-Z]') ]],
      apellido: ['',[ Validators.required, Validators.pattern('[a-zA-Z]') ]],
      email: ['', [Validators.required,Validators.email ]], 

    });
  }

  ngOnInit(): void { //Se captura el id del path y se valida que no se haya cambiado y sea el mismo que el de la session 
     this.idAlumno = + (this.route.snapshot.paramMap.get('idAlumno')?? 0);
  
      this.usuarioId = this.tokenService.getIdEntidad() || 0;
  
    
      if (this.idAlumno !== this.usuarioId) {
        this.router.navigateByUrl('/error-404');
      }
     
    
 
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
