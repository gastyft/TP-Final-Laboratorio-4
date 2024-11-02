import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./componentes/contenedora/header/header.component";
 import { ListaComponent } from './componentes/curso/lista/lista.component';
import { PrincipalComponent } from "./componentes/contenedora/vista-video-clase/principal.component";
import { FooterComponent } from "./componentes/contenedora/footer/footer.component";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ListaComponent, PrincipalComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-practica';
}
