import { HttpClient, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { EmisorService } from 'src/app/shared/emisor.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trabajadores-select',
  templateUrl: './trabajadores-select.component.html',
  styleUrls: ['./trabajadores-select.component.css']
})
export class TrabajadoresSelectComponent {

  emisores: any;
  selectedEmisor: string;
  mensajeError: any;
  emisorComp: any; 
  trabajadores: any[] = [];
  datosTablaOriginal: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  
  
  constructor(private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router) {
    this.selectedEmisor= '';
  } // Inyecta HttpClient en el constructor


  ngOnInit() {
    this.http.get<any>('api/Api/emisores')
      .subscribe((data: any[]) => {
        this.emisores = data.map(emisor => {
          return {
            NombreEmisor: emisor.NombreEmisor,
            Codigo: emisor.Codigo
          };
        });
        console.log(this.emisores); 
      });
      this.fetchTrabajadores()
  }

  onChangeEmisor(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedIndex = target.selectedIndex;
    const emisorNombre = target.options[selectedIndex].value;
    console.log('Nombre del emisor seleccionado:', emisorNombre);
    this.emisorComp = emisorNombre;
  }




  onSubmit() {


    if (!this.emisorComp) {
      Swal.fire('¡Usuario o Contraseña incorrecta!');
      return;
    }
    else{
      this.fetchTrabajadores()
    }
    
  }






  fetchTrabajadores(): void {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>(`/api/Api/trabajador/select?sucursal=${this.emisorComp}`).subscribe(
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
