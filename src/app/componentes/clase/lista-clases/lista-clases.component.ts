import { Component, OnInit } from '@angular/core';
import { NavProfesorComponent } from "../../profesor/nav-profesor/nav-profesor.component";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token.service';
import { CursoService } from '../../../services/curso.service';
import { Curso } from '../../../models/curso.model';

@Component({
  selector: 'app-lista-clases',
  standalone: true,
  imports: [NavProfesorComponent,CommonModule,RouterLink],
  templateUrl: './lista-clases.component.html',
  styleUrl: './lista-clases.component.css'
})
export class ListaClasesComponent implements OnInit {
  constructor(private router: Router, private tokenService: TokenService,private route:ActivatedRoute,
    private cursoService: CursoService,
  ) {
    
  }
idProfesor!: number;
usuarioId!:number;
idCurso!:number;
curso!: Curso;

  ngOnInit(): void {
 
    this.idProfesor =+this.route.snapshot.params['idProfesor'];
    this.idCurso =+this.route.snapshot.params['idCurso'];
    this.usuarioId = this.tokenService.getIdEntidad()??0; 
 
     if (this.idProfesor !== this.usuarioId) {
      
       this.router.navigateByUrl('/error-404');   
     } 
     this.getClases();
}

getClases(){
this.cursoService.getCursoById(this.idCurso).subscribe(c =>{

  this.curso=c;
},
 err  => {
});

}

}
