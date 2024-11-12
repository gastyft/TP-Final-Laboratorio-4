import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventEmitter } from 'stream';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-nav-profesor',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-profesor.component.html',
  styleUrl: './nav-profesor.component.css'
})
export class NavProfesorComponent implements OnInit{
 
  constructor(private route:ActivatedRoute,private tokenService: TokenService,private router: Router){}
  idProfesor!: number;
  isLogged : boolean= false;
  roles: string[]=[];
  usuarioId!:number;
  ngOnInit(): void {

    this.idProfesor =+this.route.snapshot.params['idProfesor'];
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getAuthorities();
      this.isLogged = true;
  }
  
  this.usuarioId = this.tokenService.getIdEntidad()??0; 

  if (this.idProfesor !== this.usuarioId) {
   
    this.router.navigateByUrl('/error-404');   
  } 
}

onLogOut(): void {
  this.tokenService.logOut();
  window.location.reload();
 
}
}