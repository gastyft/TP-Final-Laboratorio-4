import { CommonModule } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-nav-profesor',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-profesor.component.html',
  styleUrl: './nav-profesor.component.css'
})
export class NavProfesorComponent implements OnInit{
 
  constructor(private route:ActivatedRoute){}
  idProfesor: string | null = null;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.idProfesor = params.get('idProfesor');
    });
  }
}