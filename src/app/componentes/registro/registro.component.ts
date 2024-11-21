import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Profesor } from '../../models/profesor.model';
import { Alumno } from '../../models/alumno.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { nuevoUsuario } from '../../models/nuevoUsuario.model';
 

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  createProfileForm: FormGroup;
  profesor!: Profesor;
  alumno!: Alumno;
  idProfesor!: any;
  usuarioId!: number;

  constructor(
    private fb: FormBuilder,
 private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
 
  ) {
    this.createProfileForm = this.fb.group({
      userType: ['', Validators.required],
      nombre: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')]],
      apellido: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]+$')]],
      edad: ['', [Validators.required, Validators.min(18)], ],
      nombreUsuario:['',Validators.required],
      email: ['', [Validators.required, Validators.email]], 
      password: ['', Validators.required], 
  passwordConfirm: ['', [Validators.required, this.passwordMatchValidator]]  
}, { validator: this.passwordMatchValidator });
  }

 
  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const passwordConfirm = form.get('passwordConfirm')?.value;
    
    // Si no coinciden las contraseñas, devuelve el error 'mismatch'
    return password && passwordConfirm && password !== passwordConfirm
      ? { mismatch: true }
      : null;
  }
  

  ngOnInit(): void {
      swal("Cree su perfil de alumno o profesor segun fue designado");
      this.scrollToTop();
  }


    
    onSubmit() {
      if (this.createProfileForm.valid) {
        const formValues = this.createProfileForm.value;
        const nuevoUsuarioIns= new nuevoUsuario(
          formValues.nombre,
          formValues.apellido,
          formValues.edad,
          formValues.nombreUsuario,
          formValues.email,
          formValues.passwordConfirm, 
          [formValues.userType] 
        );
        this.authService.nuevo(nuevoUsuarioIns).subscribe(response => 
{
          swal("Nuevo usuario Creado","","success");
          this.router.navigateByUrl('/error-404');   
      },err => {
  
        if (err.status === 409) {
          const errorMessage = err.error?.message || "Este nombre de usuario o email ya existe";
          swal("Error", errorMessage, "error");
        } else {
         
          const errorMessage = err.error?.message || "Error desconocido";
          swal("Error", errorMessage, "error");
        }
      }
    );
  }
}

private isBrowser(): boolean {
  return typeof window !== 'undefined'; //Sin querer lo configuramos con SSR y asi podemos usar el objeto window
}
scrollToTop(): void {
  if(this.isBrowser())
  scrollTo({
    top: 0,
    behavior: 'smooth' // Desplazamiento suave
  });
}
}