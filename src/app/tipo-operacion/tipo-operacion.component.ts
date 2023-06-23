import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tipo-operacion',
  templateUrl: './tipo-operacion.component.html',
  styleUrls: ['./tipo-operacion.component.css']
})
export class TipoOperacionComponent {
  tipoOperacion: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getTipoOperacion()
  }
  
  getTipoOperacion(): void {
    this.http.get<any[]>('/api/Api/GetTipoOperacion').subscribe(
      data => {
        this.tipoOperacion = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
