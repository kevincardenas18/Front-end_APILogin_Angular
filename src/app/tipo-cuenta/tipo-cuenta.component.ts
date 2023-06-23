import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipo-cuenta',
  templateUrl: './tipo-cuenta.component.html',
  styleUrls: ['./tipo-cuenta.component.css']
})
export class TipoCuentaComponent {
  tipoCuenta: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getTipoCuenta()
  }
  
  getTipoCuenta(): void {
    this.http.get<any[]>('/api/Api/trabajador/GetTipoCuenta').subscribe(
      data => {
        this.tipoCuenta = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
