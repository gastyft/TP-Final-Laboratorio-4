import { Video } from './video.model';  

export interface Curso {
  id: number;
  title: string;
  descripcion: string;
  listaVideos: Video[]; 
}