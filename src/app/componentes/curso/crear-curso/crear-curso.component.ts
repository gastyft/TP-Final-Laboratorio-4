import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';
import { Clase } from '../../../models/clase.model';
import { NavProfesorComponent } from '../../profesor/nav-profesor/nav-profesor.component';
import { HttpClientModule } from '@angular/common/http';
import swal from 'sweetalert';
import { TokenService } from '../../../services/token.service';
@Component({
  selector: 'app-crear-curso',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule , NavProfesorComponent],
  providers:[HttpClientModule],
  templateUrl: './crear-curso.component.html',
  styleUrls: ['./crear-curso.component.css']
})
export class CrearCursoComponent implements OnInit {
  
 
  clases: Clase[] = [];
  crearCurso: FormGroup;
  idProfesor!:number;
 usuarioId!:number;
  constructor(  private cursoService: CursoService ,private route: ActivatedRoute,private fb: FormBuilder,private router: Router,private tokenService: TokenService) {
    this.crearCurso = this.fb.group({
      titulo: ['', Validators.required], 
      descripcion: ['', [ Validators.required, Validators.minLength(15)]]  
    });
 
  }
  guardarCurso(): void {
    
    if (this.crearCurso.valid) {
        const cursoData = new Curso(this.crearCurso.value.titulo, this.crearCurso.value.descripcion);

        this.cursoService.createCurso(cursoData, this.idProfesor).subscribe(response => {
            console.log('Curso guardado' + response);  //Cambiar por SWAL
             swal("Curso Guardado","","success");
             this.router.navigate(['/principal-profesor',this.idProfesor]);
         },
        error =>
        {
          swal("No se pudo guardar el curso","","success");
    });
    }  
  }
  
   

 
  ngOnInit() {
    this.idProfesor = +this.route.snapshot.params['idProfesor'];  
    
  this.usuarioId = this.tokenService.getIdEntidad()??0; 

  if (this.idProfesor !== this.usuarioId) {
   
    this.router.navigateByUrl('/error-404');   
  } 
  }
}