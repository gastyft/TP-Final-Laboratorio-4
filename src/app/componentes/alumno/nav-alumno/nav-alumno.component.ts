import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-alumno',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './nav-alumno.component.html',
  styleUrl: './nav-alumno.component.css'
})
export class NavAlumnoComponent implements OnInit {
  constructor(private route: ActivatedRoute){}
idAlumno:any;
  ngOnInit(): void {
    this.idAlumno = this.route.snapshot.params['idAlumno'];  
  
  }
}
