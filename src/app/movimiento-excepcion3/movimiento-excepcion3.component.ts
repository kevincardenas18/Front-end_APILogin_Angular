import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movimiento-excepcion3',
  templateUrl: './movimiento-excepcion3.component.html',
  styleUrls: ['./movimiento-excepcion3.component.css']
})
export class MovimientoExcepcion3Component {
  movExcepcion3: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getMovExcepcion3()
  }
  
  getMovExcepcion3(): void {
    this.http.get<any[]>('/api/Api/ObtenerMovimientosExcepcion3').subscribe(
      data => {
        this.movExcepcion3 = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
