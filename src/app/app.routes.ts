import {  RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/contenedora/vista-video-clase/principal.component';
import { VideoPlayerComponent } from './componentes/clase/video-player/video-player.component';
import { ListaComponent } from './componentes/curso/lista/lista.component';
import { Error404Component } from './componentes/contenedora/error404/error404.component';
import { NgModule } from '@angular/core';
import { CrearClaseComponent } from './componentes/clase/crear-clase/crear-clase.component';
import { CrearCursoComponent } from './componentes/curso/crear-curso/crear-curso.component';
import { FooterComponent } from './componentes/contenedora/footer/footer.component';
import { EditarPerfilComponent } from './componentes/profesor/editar-perfil/editar-perfil.component';
import { LoginComponent } from './componentes/login/login/login.component';

//import {CloudinaryModule} from '@cloudinary/ng';
 
export const routes: Routes = [

    {path:'', component: PrincipalComponent},
    {path:'principal', component: PrincipalComponent},
    {path:'videoPlayer/:id', component: VideoPlayerComponent},  
    {path:'lista-videos', component: ListaComponent},
    {path:'crear-clase', component: CrearClaseComponent},
    {path:'crear-curso', component: CrearCursoComponent},
    {path:'footer', component: FooterComponent},
    {path:'editar-perfil',component:EditarPerfilComponent},
    {path:'login', component: LoginComponent},
    { path: '**', component: Error404Component },
        
];
@NgModule({
    imports: [RouterModule.forRoot(routes), ],
    exports: [RouterModule]
})
export class AppRoutingModule { }