import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { loginUsuario } from '../../models/loginUsuario.model';
import { TokenService } from '../../services/token.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

 
    nombreUsuario: any;
    password: any;
  
    isLogged= false;
    isLoginFail = false;
    loginUsuario!: loginUsuario ;
    roles:string[]=[];
    errMsj:string | undefined;
  ;
    
  
  constructor(private authService: AuthService,   private router:Router,
  
    private tokenService:TokenService ) { 
    }
  
  
  
  
    ngOnInit(): void {
  this.scrollToTop();
      if(this.tokenService.getToken()){
        this.isLogged=true;
        this.isLoginFail=false;
        this.roles = this.tokenService.getAuthorities();
      }
    }
    onLogin(): void {
      this.loginUsuario = new loginUsuario(this.nombreUsuario, this.password);
 
      this.authService.login(this.loginUsuario).subscribe(
        data => {
          this.isLogged = true;
  
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.tokenService.setIdEntidad(data.idEntidad);
          this.roles = this.tokenService.getAuthorities();
          
          swal('Bienvenido ' + data.nombreUsuario,"","success");
        
          if (this.roles.includes("ROLE_PROFESOR")) {
            this.router.navigateByUrl(`/principal-profesor/${data.idEntidad}`);
          } else if (this.roles.includes("ROLE_ALUMNO") ) {
            this.router.navigateByUrl(`/principal-alumno/${data.idEntidad}`);
          }  
        },
      err => {
    this.isLogged = false;
    if (err.status === 404) {
      this.errMsj = "El usuario no existe";
    } else {
      this.errMsj = "Usuario o contraseña mal colocada";
    }
    swal("" + this.errMsj, "", "error");
  }
      );
    }



    private isBrowser(): boolean {
      return typeof window !== 'undefined';
    }
    scrollToTop(): void {
      if(this.isBrowser())
      scrollTo({
        top: 0,
        behavior: 'smooth' // Desplazamiento suave
      });
    }
  }