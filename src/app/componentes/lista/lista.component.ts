import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Output() videoSeleccionado = new EventEmitter<number>(); 
  @Input()  videosVistos: { [key: number]: boolean } = {};


  selectVideo(videoId: number):void {
    this.videoSeleccionado.emit(videoId); 
  }

  marcarVideoVisto(videoId: number) {
    this.videosVistos[videoId] = true;  
  }
}
