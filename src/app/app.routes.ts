import {  RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { VideoPlayerComponent } from './componentes/video-player/video-player.component';
import { ListaComponent } from './componentes/lista/lista.component';
import { Error404Component } from './componentes/error404/error404.component';
import { NgModule } from '@angular/core';
 
export const routes: Routes = [

    {path:'',
        component: PrincipalComponent
    },
    {path:'principal',component: PrincipalComponent},
    {path:'videoPlayer/:id',component: VideoPlayerComponent},  
    {path:'lista-videos',component: ListaComponent},
    { path: '**',  
        component: Error404Component },
        
];
@NgModule({
    imports: [RouterModule.forRoot(routes), ],
    exports: [RouterModule]
})
export class AppRoutingModule { }