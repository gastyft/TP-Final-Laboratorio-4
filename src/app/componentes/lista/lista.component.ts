import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  @Output() videoSeleccionado = new EventEmitter<number>(); // Emite un ID de video

  selectVideo(videoId: number):void {
    this.videoSeleccionado.emit(videoId); // Emitimos el ID del video seleccionado
  }
}
