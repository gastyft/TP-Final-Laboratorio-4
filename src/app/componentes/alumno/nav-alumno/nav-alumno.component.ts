import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-nav-alumno',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-alumno.component.html',
  styleUrl: './nav-alumno.component.css'
})
export class NavAlumnoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private tokenService: TokenService){}
idAlumno:any;
isLogged : boolean= false;
  roles: string[]=[];
  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.params['idAlumno'];  
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