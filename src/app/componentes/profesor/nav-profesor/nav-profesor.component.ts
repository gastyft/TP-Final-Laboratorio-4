import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
 
  constructor(private route:ActivatedRoute,private tokenService: TokenService){}
  idProfesor: string | null = null;
  isLogged : boolean= false;
  roles: string[]=[];
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = params.get('idProfesor');
    });
    if (this.tokenService.getToken()) {
      this.roles = this.tokenService.getAuthorities();
      this.isLogged = true;
  }
}

onLogOut(): void {
  this.tokenService.logOut();
  window.location.reload();
 
}
}