import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent {
  genero: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getGenero()
  }
  
  getGenero(): void {
    this.http.get<any[]>('/api/Api/trabajador/GetGenero').subscribe(
      data => {
        this.genero = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
