import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-tipo-trabajador',
  templateUrl: './tipo-trabajador.component.html',
  styleUrls: ['./tipo-trabajador.component.css']
})
export class TipoTrabajadorComponent {
  tipoTrabajador: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getTipoTrabajador()
  }
  
  getTipoTrabajador(): void {
    this.http.get<any[]>('/api/Api/trabajador/GetTipoTrabajador').subscribe(
      data => {
        this.tipoTrabajador = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}