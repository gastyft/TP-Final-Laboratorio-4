import {  provideRouter, RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/contenedora/vista-video-clase/principal.component';
import { VideoPlayerComponent } from './componentes/clase/video-player/video-player.component';
import { ListaComponent } from './componentes/curso/lista/lista.component';
import { Error404Component } from './componentes/contenedora/error404/error404.component';
import { importProvidersFrom, NgModule } from '@angular/core';
import { CrearClaseComponent } from './componentes/clase/crear-clase/crear-clase.component';
import { CrearCursoComponent } from './componentes/curso/crear-curso/crear-curso.component';
import { FooterComponent } from './componentes/contenedora/footer/footer.component';
import { EditarPerfilComponent } from './componentes/profesor/editar-perfil/editar-perfil.component';
 
import { NavProfesorComponent } from './componentes/profesor/nav-profesor/nav-profesor.component';
import { PrincipalProfesorComponent } from './componentes/profesor/principal-profesor/principal-profesor.component';
import { ListarCursosComponent } from './componentes/profesor/listar-cursos/listar-cursos.component';
import { EditarCursoComponent } from './componentes/curso/editar-curso/editar-curso.component';
import { LoginComponent } from './componentes/login/login.component';
 

//import {CloudinaryModule} from '@cloudinary/ng';
 
export const routes: Routes = [

    {path:'', component: PrincipalComponent},
    {path:'principal', component: PrincipalComponent},
    {path:'videoPlayer/:id', component: VideoPlayerComponent},  
    {path:'lista-videos', component: ListaComponent},
    {path:'crear-clase', component: CrearClaseComponent}, //Agregar id de curso 
    {path:'crear-curso', component: CrearCursoComponent},
    {path:'footer', component: FooterComponent},
    {path:'editar-perfil/:id',component:EditarPerfilComponent},
    {path:'login', component: LoginComponent},
    {path:'nav-profesor', component: NavProfesorComponent,pathMatch: 'full'},
    {path:'principal-profesor/:id',component: PrincipalProfesorComponent, pathMatch: 'full'}, // principal-profesor/:id
    {path:'listar-cursos', component: ListarCursosComponent},
    {path:'editar-curso/:id',component: EditarCursoComponent},
    { path: '**', component: Error404Component },
        
];
@NgModule({
    imports: [RouterModule.forRoot(routes), ],
    exports: [RouterModule],
  
})
export class AppRoutingModule { }