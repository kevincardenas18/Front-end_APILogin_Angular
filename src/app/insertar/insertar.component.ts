import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable, catchError, tap, throwError } from 'rxjs';


@Component({
  selector: 'app-insertar',
  templateUrl: './insertar.component.html',
  styleUrls: ['./insertar.component.css']
})
export class InsertarComponent {

  codigo: number | undefined;
  descripcion: string | undefined;
  apiResponse: any;

  constructor(private http: HttpClient,private router: Router) { } // Inyecta HttpClient en el constructor
  
  ngOnInit(): void {
    const apiUrl = 'api/Api/emisores';
    this.http.get(apiUrl).subscribe((response) => {
      this.apiResponse = response;
      console.log(this.apiResponse)
    });
  }

  onSubmit() {
    const url = `api/Api/centroCostos/insert?codigoCentroCostos=${this.codigo}&descripcionCentroCostos=${this.descripcion}`;
    
    const body = { codigoCentroCostos: this.codigo, descripcionCentroCostos: this.descripcion };
    this.http.post(url, body).subscribe(
      (response) => {
        console.log(response);
        Swal.fire('Se ha ingresado exitosamente');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error(error);
        Swal.fire('¡Error!');
        this.router.navigate(['/home']);
      }
    );
  }


  // onSubmit() {
  //   //const url = 'api/Api/centroCostos/insert';
  //   const url = 'api/Api/centroCostos/insert?codigoCentroCostos=${this.codigo}&descripcionCentroCostos=${this.descripcion}';
    
  //   const body = { codigoCentroCostos: this.codigo, descripcionCentroCostos: this.descripcion };
  //   this.http.get(url).subscribe(
  //     (response) => {
  //       console.log(response);
  //       Swal.fire('Se ha ingresado exitosamente');
  //       this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       console.error(error);
  //       Swal.fire('¡Error!');
  //       this.router.navigate(['/home']);
  //     }
  //   );
  // }

}
