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
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalAlumnoComponent } from './componentes/alumno/principal-alumno/principal-alumno.component';
import { NavAlumnoComponent } from './componentes/alumno/nav-alumno/nav-alumno.component';
import { ListarCursosAlumnoComponent } from './componentes/alumno/listar-cursos-alumno/listar-cursos-alumno.component';
import { ListarCursosAlumnoInscriptoComponent } from './componentes/alumno/listar-cursos-alumno-inscripto/listar-cursos-alumno-inscripto.component';
import { EditarPerfilAlumnoComponent } from './componentes/alumno/editar-perfil-alumno/editar-perfil-alumno.component';
 
import { AuthGuard } from './services/auth.guard';
 
 
export const routes: Routes = [
    //ROUTING A PAGINA DEFECTO
    {path:'', component: LoginComponent},
    //CLASE
    {path:'principal-alumno/:idAlumno/principal/:idCurso', component: PrincipalComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},  
    {path:'videoPlayer/:id', component: VideoPlayerComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},  
    {path:'principal-profesor/:idProfesor/crear-clase/:idCurso', component: CrearClaseComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']}},  
    //CURSO
    {path:'lista-videos', component: ListaComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},  
    {path:'principal-profesor/:idProfesor/crear-curso', component: CrearCursoComponent,canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']}},
    {path:'principal-profesor/:idProfesor/editar-curso/:idCurso',component: EditarCursoComponent,canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']}},
    //COMPLEMENTOS
    {path:'footer', component: FooterComponent},
    //LOGIN Y REGISTRO
    {path:'login', component: LoginComponent},
    {path:'registro',component:RegistroComponent},
    //PROFESOR
    {path:'principal-profesor/:idProfesor', component: PrincipalProfesorComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']} },
    {path:'principal-profesor/:idProfesor/nav-profesor', component: NavProfesorComponent,canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']}},
    {path:'principal-profesor/:idProfesor',component: PrincipalProfesorComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']} }, 
    {path:'principal-profesor/:idProfesor/listar-cursos', component: ListarCursosComponent,canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']}},
    {path:'principal-profesor/:idProfesor/editar-perfil',component:EditarPerfilComponent,canActivate:[AuthGuard], data:{expectedRol:['ROLE_PROFESOR']}},
    //ALUMNO
    {path:'principal-alumno/:idAlumno', component: PrincipalAlumnoComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},
    {path:'principal-alumno/:idAlumno/nav-alumno', component: NavAlumnoComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},
    {path:'principal-alumno/:idAlumno/listar-cursos-alumno',component: ListarCursosAlumnoComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},
    {path:'principal-alumno/:idAlumno/listar-cursos-alumno-inscripto', component: ListarCursosAlumnoInscriptoComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},
    {path:'principal-alumno/:idAlumno/editar-perfil-alumno', component: EditarPerfilAlumnoComponent, canActivate:[AuthGuard], data:{expectedRol:['ROLE_ALUMNO']}},
    //ROUTING DE ERROR
    { path: '**', component: Error404Component },
        
];
@NgModule({
    imports: [RouterModule.forRoot(routes), ],
    exports: [RouterModule],
  
})
export class AppRoutingModule { }