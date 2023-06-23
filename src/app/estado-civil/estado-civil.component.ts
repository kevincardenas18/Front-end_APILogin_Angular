import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-estado-civil',
  templateUrl: './estado-civil.component.html',
  styleUrls: ['./estado-civil.component.css']
})
export class EstadoCivilComponent {
  estadoCivil: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getEstadoCivil()
  }
  
  getEstadoCivil(): void {
    this.http.get<any[]>('/api/Api/trabajador/GetEstadoCivil').subscribe(
      data => {
        this.estadoCivil = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
