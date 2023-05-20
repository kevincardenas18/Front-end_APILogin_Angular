import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-trabajadores-select',
  templateUrl: './trabajadores-select.component.html',
  styleUrls: ['./trabajadores-select.component.css']
})
export class TrabajadoresSelectComponent {
  trabajadores: any[] = [];
  datosTablaOriginal: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  
  constructor(private http: HttpClient) {} // Inyecta HttpClient en el constructor
  ngOnInit(): void {
    this.fetchTrabajadores()
  }
  fetchTrabajadores(): void {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>('/api/Api/trabajador/select?sucursal=2').subscribe(
      data => {
        this.trabajadores = data;
        this.datosTablaOriginal = data;
      },
      error => {
        console.log(error);
      }
    );
  }
}
