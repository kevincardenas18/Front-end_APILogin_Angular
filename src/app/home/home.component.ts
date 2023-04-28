import { Component, OnInit } from '@angular/core';
import { EmisorService } from '../shared/emisor.service';
import { DomSanitizer } from '@angular/platform-browser';  
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FilterPipe } from '../pipes/filter.pipe';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  emisorNombre = '';
  emisorRuc = '';
  logoUrl:any;
  centroCostos: any[] = [];
  datos: any;
  codigo: number | undefined;
  descripcion: string | undefined;
  apiResponse: any;
  busqueda: string = '';
  nombreBusqueda: string = '';


  

  constructor(private emisorService: EmisorService,private sanitizer: DomSanitizer, private http: HttpClient,private router: Router) {
    this.logoUrl = this.sanitizer.bypassSecurityTrustUrl('assets/img/logo-taller.svg');  

   }

  ngOnInit(): void {
    const emisorData = this.emisorService.getEmisorData();
    console.log(emisorData)
    this.emisorNombre = emisorData.nombre;
    this.emisorRuc = emisorData.ruc;

    this.http.get<any[]>('api/Api/centroCostos').subscribe(
      data => {
        this.centroCostos = data;
        console.log(this.centroCostos)
      },
      error => {
        console.log(error);
      }
    );
    
  }

  nuevoCentroCostos() {
    this.router.navigate(['/insertar']);
  }

  eliminarCentroCostos(codigo: number, descripcion: string) {
    const params = new HttpParams()
        .set('codigocentrocostos', codigo.toString())
        .set('descripcioncentrocostos', descripcion);

    if (confirm('¿Está seguro que desea eliminar el centro de costos?')) {
      this.http.delete('/api/Api/centroCostos/delete', { params }).subscribe(result => {
        console.log(result);
        Swal.fire('Se ha eliminado exitosamente').then(() => {
          location.reload();
        });
      }, error => {
        console.error(error);
        Swal.fire('Ocurrió un error al eliminar el centro de costos', '', 'error');
      });
    }
  }

  buscarCentroCostos(){
    this.router.navigate(['/busqueda']);
  }


  
  

}
