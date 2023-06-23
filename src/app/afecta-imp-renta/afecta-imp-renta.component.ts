import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-afecta-imp-renta',
  templateUrl: './afecta-imp-renta.component.html',
  styleUrls: ['./afecta-imp-renta.component.css']
})
export class AfectaImpRentaComponent {
  afectaImpRenta: any[] = [];

  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor

  ngOnInit(): void {
    this.getAfectaImpRenta()
  }
  
  getAfectaImpRenta(): void {
    this.http.get<any[]>('/api/Api/GetTrabAfecImpuestoRenta').subscribe(
      data => {
        this.afectaImpRenta = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
