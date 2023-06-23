import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipo-contrato',
  templateUrl: './tipo-contrato.component.html',
  styleUrls: ['./tipo-contrato.component.css']
})
export class TipoContratoComponent {
  tipoContrato: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getTipoContrato()
  }
  
  getTipoContrato(): void {
    this.http.get<any[]>('/api/Api/trabajador/GetTipoContrato').subscribe(
      data => {
        this.tipoContrato = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
