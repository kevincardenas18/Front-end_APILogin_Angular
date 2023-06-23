import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-movimiento-excepcion1y2',
  templateUrl: './movimiento-excepcion1y2.component.html',
  styleUrls: ['./movimiento-excepcion1y2.component.css']
})
export class MovimientoExcepcion1y2Component {
  movExcepcion1y2: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getMovExcepcion1y2()
  }
  
  getMovExcepcion1y2(): void {
    this.http.get<any[]>('/api/Api/ObtenerMovimientosExcepcion1y2').subscribe(
      data => {
        this.movExcepcion1y2 = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
