import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Component, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { EmisorService } from 'src/app/shared/emisor.service';
import { AutorizadorService } from 'src/app/shared/autorizador.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';  
import Swal from 'sweetalert2';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal'
import { FormsModule, NgForm } from '@angular/forms';
import * as XLSX from 'xlsx';
import { forkJoin,Observable, of } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-trabajadores-select',
  templateUrl: './trabajadores-select.component.html',
  styleUrls: ['./trabajadores-select.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TrabajadoresSelectComponent {

  trabajadores: any[] = [];
  dataSource: any[] = [];
  datosTablaOriginal: any[] = [];
  currentPage = 1;
  itemsPerPage = 15;
  emisorSeleccionado: any;
  mensaje: any = "";
  mensaje2: any = "";
  tipoTrabajadorOptions: any[] = [];
  generoOptions: any[] = [];
  centroCostosOptions: any[] = [];
  estadoTrabajadorOptions: any[] = [];
  tipoContratoOptions: any[] = [];
  tipoCeseOptions: any[] = [];
  estadoCivilOptions: any[] = []
  esReingresoOptions: any[] = []
  tipoCuentaOptions: any[] = []
  nivelSalarialOptions: any
  tipoComisionOptions: any
  fondoReservaOptions: any
  decimoTerceroDecimoCuartoOptions: any
  categoriaOcupacionalOptions: any
  periodoVacacionesOptions: any
  nombresBusqueda: string = '';
  cedula: string =''; 
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  @ViewChild('modalEditTemplate') modalEditTemplate!: TemplateRef<any>;
  @ViewChild('table', { static: false }) table: ElementRef;
  modalRef?: BsModalRef;
  codigoEmisorSeleccionado: string = '';
  trabajadorSeleccionado: any
  apellidoMaterno: any
  apellidoPaterno: any
  nombres: any
  direccion: any
  identificacion: any
  carnetIESS: any
  entidadBancaria: any
  telefonoMovil: any
  telefonoFijo: any
  tipoTrabajadorSeleccionado: any
  generoSeleccionado: any
  nroCtaBancaria: any
  codigoCatOcupacionSeleccionado: any
  ocupacion: any
  centroCostosSeleccionado: any
  estadoTrabajadorSeleccionado: any
  nivelSalarialSeleccionado: any
  tipoContratoSeleccionado: any
  estadoCivilSeleccionado: any
  tipoCeseSeleccionado: any
  fechaNacimiento: any
  tipoComisionSeleccionado: any
  periodoVacacionesSeleccionado: any
  fechaIngreso: any
  fechaCese: any
  esReingresoSeleccionado: any
  fechaUltActualizacion: any
  fechaReingreso: any
  tipoCuentaSeleccionado: any
  decimo14roSeleccionado: any
  decimo13roSeleccionado: any
  remuneracionMinima: any
  boniEspecial: any
  boniComplementaria: any
  fondoReservaSeleccionado: any
  identificacionInvalid: boolean = false;
  
  
  constructor(private modalService: BsModalService, private http: HttpClient,private sanitizer: DomSanitizer,private emisorService: EmisorService,private router: Router, public autorizadorService: AutorizadorService) {
    this.table = new ElementRef(null);
  } 

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  descargarTablaExcel(): void {
    const observables = [];
    const totalPages = Math.ceil(this.trabajadores.length / this.itemsPerPage);
  
    for (let i = 1; i <= totalPages; i++) {
      observables.push(this.getPageData(i));
    }
  
    forkJoin(observables).subscribe((pagesData: any[]) => {
      const data = pagesData.reduce((acc, pageData) => acc.concat(pageData), []);
      const filteredData = this.filterColumns(data);
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredData);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Tabla');
  
      // Generar el archivo Excel
      XLSX.writeFile(wb, 'listadoTrabajadores.xlsx');
    });
  }
  columnasExportar: string[] = ['Apellido_Paterno', 'Apellido_Materno', 'Nombres', 'FechaNacimiento', 'Genero', 'Direccion', 'Telefono_Movil', 'Telefono_Fijo', 'Remuneracion_Minima', 'FormaCalculo13ro', 'FormaCalculo14ro',
  'Fondo_Reserva', 'Entidad_Bancaria', 'Tipo_Cuenta', 'Nro_Cuenta_Bancaria', 'FechaIngreso'];
  filterColumns(data: any[]): any[] {
    const filteredData: any[] = [];
  
    for (const item of data) {
      const filteredItem: any = {};
  
      for (const columna of this.columnasExportar) {
        filteredItem[columna] = item[columna];
      }
  
      filteredData.push(filteredItem);
    }
  
    return filteredData;
  }

  getPageData(page: number): Observable<any> {
    const start = (page - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const data = this.trabajadores.slice(start, end);
  
    return of(data); // Importa 'of' desde 'rxjs' si no lo tienes importado
  }

  ngOnInit() {
    this.fetchTrabajadores()
    //console.log('Sesión iniciada:', this.autorizadorService.sesionIniciada);


    this.http.get<any[]>('/api/Api/trabajador/GetTipoTrabajador')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Descripcion + " - " +item.Codigo.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoTrabajadorOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetGenero')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.generoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/centroCostos')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.NombreCentroCostos.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.centroCostosOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetEstadoTrabajador')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.estadoTrabajadorOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetTipoContrato')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoContratoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetTipoCese')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoCeseOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetEstadoCivil')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.estadoCivilOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetEsReingreso')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.esReingresoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetTipoCuenta')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +item.Descripcion.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoCuentaOptions = data;
        },
          error => {
            console.log(error);
          }
      );





      this.http.get<any[]>('/api/Api/trabajador/GetPeriodoVacaciones')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Descripcion + " - " + item.Codigo.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.periodoVacacionesOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetTipoComision')
      .pipe(
        map(data => data.map(item => ({
          value: item.Descripcion, // Usar DesripMovimientoExce como valor
          label: item.Descripcion + " - " +item.Codigo.trim() // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.tipoComisionOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetDecimoTerceroDecimoCuarto')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo.trim(), // Usar DesripMovimientoExce como valor
          label: item.Codigo.trim() + " - " +item.Descripcion // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.decimoTerceroDecimoCuartoOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetFondoReserva')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo.trim(), // Usar DesripMovimientoExce como valor
          label: item.Codigo.trim()+ ' - ' + item.Descripcion// Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.fondoReservaOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetCategoriaOcupacional')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +  item.Descripcion // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.categoriaOcupacionalOptions = data;
        },
          error => {
            console.log(error);
          }
      );

      this.http.get<any[]>('/api/Api/trabajador/GetNivelSalarial')
      .pipe(
        map(data => data.map(item => ({
          value: item.Codigo, // Usar DesripMovimientoExce como valor
          label: item.Codigo + " - " +  item.Descripcion // Mostrar CodigoMovimientoExce en la interfaz
        })))
      ).subscribe(
        data => {
          this.nivelSalarialOptions = data;
        },
          error => {
            console.log(error);
          }
      );




  }


  fetchTrabajadores(): void {
    const codigoEmisorSeleccionado = this.emisorService.getEmisorData().compania;
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('itemsPerPage', this.itemsPerPage.toString());
  
    this.http.get<any[]>(`/api/Api//trabajador/select?sucursal=${codigoEmisorSeleccionado}`).subscribe(
      data => {
        this.trabajadores = data;
        this.datosTablaOriginal = data;
        this.dataSource = data;
      },
      error => {
        console.log(error);
      }
    );
  }




  eliminarTrabajador(sucursal: number, idEmpleado: string) {
    const params = new HttpParams()
      .set('sucursal', sucursal.toString())
      .set('codigoempleado', idEmpleado);
  
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro que desea eliminar el trabajador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.get('/api/Api/trabajador/delete', { params }).subscribe(
          result => {
            Swal.fire('Se ha eliminado exitosamente').then(() => {
              // Realizar acciones adicionales después de eliminar
              this.fetchTrabajadores()
            });
          },
          error => {
            console.error(error);
            Swal.fire('Ocurrió un error al eliminar al intentar eliminar el trabajador', '', 'error');
          }
        );
      }
    });
  }

  // getOptionsTipoTrabajador(): { value: string, label: string }[] {
  //   return this.tipoTrabajadorOptions;
  // }

  // getOptionsGenero(): { value: string, label: string }[] {
  //   return this.generoOptions;
  // }

  // getOptionsCentroCostos(): { value: string, label: string }[] {
  //   return this.centroCostosOptions;
  // }

  // getOptionsEstadoTrabajador(): { value: string, label: string }[] {
  //   return this.estadoTrabajadorOptions;
  // }

  // getOptionsTipoContrato(): { value: string, label: string }[] {
  //   return this.tipoContratoOptions;
  // }

  // getOptionsTipoCese(): { value: string, label: string }[] {
  //   return this.tipoCeseOptions;
  // }

  // getOptionsEstadoCivil(): { value: string, label: string }[] {
  //   return this.estadoCivilOptions;
  // }

  // getOptionsEsReingreso(): { value: string, label: string }[] {
  //   return this.esReingresoOptions;
  // }

  // getOptionsTipoCuenta(): { value: string, label: string }[] {
  //   return this.tipoCuentaOptions;
  // }

  nuevoTrabajador(){
    this.codigoEmisorSeleccionado = this.emisorService.getEmisorData().compania;
    // Abre el modal
    this.modalRef = this.modalService.show(this.modalTemplate, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      //validar ingreso de fechas en blanco
      const fechaCeseValue = this.fechaCese ? new Date(this.fechaCese) : new Date(1753, 0, 1);
      const fechaReingresoValue = this.fechaReingreso ? new Date(this.fechaReingreso) : new Date(1753, 0, 1);
      // Verificar si se ha seleccionado la opción en blanco
      if (this.tipoCeseSeleccionado === 'vacio') {
        this.tipoCeseSeleccionado = '';
      }
      // El formulario es válido, realiza acciones adicionales aquí
      this.guardarNuevoTrabajador(
        parseInt(this.codigoEmisorSeleccionado),
        this.tipoTrabajadorSeleccionado,
        this.apellidoPaterno,
        this.apellidoMaterno,
        this.nombres,
        this.identificacion,
        this.entidadBancaria,
        this.carnetIESS,
        this.direccion,
        this.telefonoFijo,
        this.telefonoMovil,
        this.generoSeleccionado,
        this.nroCtaBancaria,
        this.codigoCatOcupacionSeleccionado,
        this.ocupacion,
        this.centroCostosSeleccionado,
        this.nivelSalarialSeleccionado,
        this.estadoTrabajadorSeleccionado,
        this.tipoContratoSeleccionado,
        this.tipoCeseSeleccionado,
        this.estadoCivilSeleccionado,
        this.tipoComisionSeleccionado,
        new Date(this.fechaNacimiento),
        new Date(this.fechaIngreso),
        // new Date(this.fechaCese), 
        fechaCeseValue,
        this.periodoVacacionesSeleccionado,
        // new Date(this.fechaReingreso), 
        fechaReingresoValue,
        new Date(this.fechaUltActualizacion), 
        this.esReingresoSeleccionado, 
        this.tipoCuentaSeleccionado,
        this.decimo13roSeleccionado,
        this.decimo14roSeleccionado,
        this.boniComplementaria,
        this.boniEspecial, 
        this.remuneracionMinima,
        this.fondoReservaSeleccionado
      )
    } else {
      console.log("formulario invalido")
      // El formulario es inválido, muestra la alerta
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Es necesario llenar todos los campos requeridos.',
      });
    }
  }


  guardarNuevoTrabajador(
    COMP_Codigo: number,
    Tipo_trabajador: string,
    Apellido_Paterno: string,
    Apellido_Materno: string,
    Nombres: string,
    Identificacion: string,
    Entidad_Bancaria: string,
    CarnetIESS: string,
    Direccion: string,
    Telefono_Fijo: string,
    Telefono_Movil: string,
    Genero: string,
    Nro_Cuenta_Bancaria: string,
    Codigo_Categoria_Ocupacion: string,
    Ocupacion: string,
    Centro_Costos: string,
    Nivel_Salarial: string,
    EstadoTrabajador: string,
    Tipo_Contrato: string,
    Tipo_Cese: string,
    EstadoCivil: string,
    TipodeComision: string,
    FechaNacimiento: Date,
    FechaIngreso: Date,
    FechaCese: Date,
    PeriododeVacaciones: number,
    FechaReingreso: Date,
    Fecha_Ult_Actualizacion: Date,
    EsReingreso: string,
    Tipo_Cuenta: string,
    FormaCalculo13ro: number,
    FormaCalculo14ro: number,
    BoniComplementaria: number,
    BoniEspecial: number,
    Remuneracion_Minima: number,
    Fondo_Reserva: string
  ): void {
    const url = `/api/Api/trabajador/Insert?` +
      `COMP_Codigo=${COMP_Codigo}` +
      `&Tipo_trabajador=${Tipo_trabajador}` +
      `&Apellido_Paterno=${Apellido_Paterno}` +
      `&Apellido_Materno=${Apellido_Materno}` +
      `&Nombres=${Nombres}` +
      `&Identificacion=${Identificacion}` +
      `&Entidad_Bancaria=${Entidad_Bancaria}` +
      `&CarnetIESS=${CarnetIESS}` +
      `&Direccion=${Direccion}` +
      `&Telefono_Fijo=${Telefono_Fijo}` +
      `&Telefono_Movil=${Telefono_Movil}` +
      `&Genero=${Genero}` +
      `&Nro_Cuenta_Bancaria=${Nro_Cuenta_Bancaria}` +
      `&Codigo_Categoria_Ocupacion=${Codigo_Categoria_Ocupacion}` +
      `&Ocupacion=${Ocupacion}` +
      `&Centro_Costos=${Centro_Costos}` +
      `&Nivel_Salarial=${Nivel_Salarial}` +
      `&EstadoTrabajador=${EstadoTrabajador}` +
      `&Tipo_Contrato=${Tipo_Contrato}` +
      `&Tipo_Cese=${Tipo_Cese}` +
      `&EstadoCivil=${EstadoCivil}` +
      `&TipodeComision=${TipodeComision}` +
      `&FechaNacimiento=${FechaNacimiento.toISOString()}` +
      `&FechaIngreso=${FechaIngreso.toISOString()}` +
      `&FechaCese=${FechaCese.toISOString()}` +
      `&PeriododeVacaciones=${PeriododeVacaciones}` +
      `&FechaReingreso=${FechaReingreso.toISOString()}` +
      `&Fecha_Ult_Actualizacion=${Fecha_Ult_Actualizacion.toISOString()}` +
      `&EsReingreso=${EsReingreso}` +
      `&Tipo_Cuenta=${Tipo_Cuenta}` +
      `&FormaCalculo13ro=${FormaCalculo13ro}` +
      `&FormaCalculo14ro=${FormaCalculo14ro}` +
      `&BoniComplementaria=${BoniComplementaria}` +
      `&BoniEspecial=${BoniEspecial}` +
      `&Remuneracion_Minima=${Remuneracion_Minima}` +
      `&Fondo_Reserva=${Fondo_Reserva}`;
      this.http.request('post', url, { observe: 'response', responseType: 'text' }).subscribe(
        (response) => {
          const responseBody = response.body;
          if (response.status === 200) {
            if (responseBody === 'Ingreso Exitoso') {
              Swal.fire({
                title: 'El trabajador se ha creado correctamente',
                icon: 'success',
                showCancelButton: false,
              }).then(() => {
                this.modalRef?.hide();
                this.fetchTrabajadores();
              });
            } else {
              Swal.fire('Error en la API', responseBody || '', 'error');
            }
          } else {
            Swal.fire('Error en la API', responseBody || '', 'error');
          }
        },
        (error: HttpErrorResponse) => {
          console.error(error);
          if (error.status === 400 && error.error) {
            Swal.fire('Error en la API', error.error, 'error');
          } else {
            Swal.fire('Error al crear el trabajador', '', 'error');
          }
        }
      );
      
  }

  editarTrabajador(sucursal: number, idEmpleado: number){
    this.trabajadorSeleccionado = this.trabajadores.find(cc => cc.Id_Trabajador === idEmpleado);
    this.codigoEmisorSeleccionado = this.emisorService.getEmisorData().compania;
    this.trabajadorSeleccionado.Identificacion = this.trabajadorSeleccionado.Identificacion.trim();
    this.modalRef = this.modalService.show(this.modalEditTemplate, {
      class: 'modal-lg',
      backdrop: 'static',
      keyboard: false
    });
  }

  onSubmit2(form: NgForm) {
    if (form.valid) {
      //validar ingreso de fechas en blanco
      const fechaCeseValue = this.trabajadorSeleccionado.FechaCese ? new Date(this.trabajadorSeleccionado.FechaCese) : new Date(1753, 0, 1);
      const fechaReingresoValue = this.trabajadorSeleccionado.FechaReingreso ? new Date(this.trabajadorSeleccionado.FechaReingreso) : new Date(1753, 0, 1);
      // Verificar si se ha seleccionado la opción en blanco
      if (this.trabajadorSeleccionado.Tipo_Cese === 'vacio') {
        this.trabajadorSeleccionado.Tipo_Cese = '';
      }
      // El formulario es válido, realiza acciones adicionales aquí
      this.guardarCambiosTrabajador(
        parseInt(this.codigoEmisorSeleccionado),
        this.trabajadorSeleccionado.Id_Trabajador,
        this.trabajadorSeleccionado.Tipo_trabajador,
        this.trabajadorSeleccionado.Apellido_Paterno,
        this.trabajadorSeleccionado.Apellido_Materno,
        this.trabajadorSeleccionado.Nombres,
        this.trabajadorSeleccionado.Identificacion,
        this.trabajadorSeleccionado.Entidad_Bancaria,
        this.trabajadorSeleccionado.CarnetIESS,
        this.trabajadorSeleccionado.Direccion,
        this.trabajadorSeleccionado.Telefono_Fijo,
        this.trabajadorSeleccionado.Telefono_Movil,
        this.trabajadorSeleccionado.Genero,
        this.trabajadorSeleccionado.Nro_Cuenta_Bancaria,
        this.trabajadorSeleccionado.Codigo_Categoria_Ocupacion,
        this.trabajadorSeleccionado.Ocupacion,
        this.trabajadorSeleccionado.Centro_Costos,
        this.trabajadorSeleccionado.Nivel_Salarial,
        this.trabajadorSeleccionado.EstadoTrabajador,
        this.trabajadorSeleccionado.Tipo_Contrato,
        this.trabajadorSeleccionado.Tipo_Cese,
        this.trabajadorSeleccionado.EstadoCivil,
        this.trabajadorSeleccionado.TipodeComision,
        new Date(this.trabajadorSeleccionado.FechaNacimiento),
        new Date(this.trabajadorSeleccionado.FechaIngreso),
        // new Date(this.fechaCese), 
        fechaCeseValue,
        this.trabajadorSeleccionado.PeriododeVacaciones,
        // new Date(this.fechaReingreso), 
        fechaReingresoValue,
        new Date(this.trabajadorSeleccionado.Fecha_Ult_Actualizacion), 
        this.trabajadorSeleccionado.EsReingreso, 
        this.trabajadorSeleccionado.Tipo_Cuenta,
        this.trabajadorSeleccionado.FormaCalculo13ro,
        this.trabajadorSeleccionado.FormaCalculo14ro,
        this.trabajadorSeleccionado.BoniComplementaria,
        this.trabajadorSeleccionado.BoniEspecial, 
        this.trabajadorSeleccionado.Remuneracion_Minima,
        this.trabajadorSeleccionado.Fondo_Reserva
      )
    } else {
      console.log("formulario invalido")
      // El formulario es inválido, muestra la alerta
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Es necesario llenar todos los campos requeridos.',
      });
    }
  }

  guardarCambiosTrabajador(
    COMP_Codigo: number,
    Id_Trabajador: number,
    Tipo_trabajador: string,
    Apellido_Paterno: string,
    Apellido_Materno: string,
    Nombres: string,
    Identificacion: string,
    Entidad_Bancaria: string,
    CarnetIESS: string,
    Direccion: string,
    Telefono_Fijo: string,
    Telefono_Movil: string,
    Genero: string,
    Nro_Cuenta_Bancaria: string,
    Codigo_Categoria_Ocupacion: string,
    Ocupacion: string,
    Centro_Costos: string,
    Nivel_Salarial: string,
    EstadoTrabajador: string,
    Tipo_Contrato: string,
    Tipo_Cese: string,
    EstadoCivil: string,
    TipodeComision: string,
    FechaNacimiento: Date,
    FechaIngreso: Date,
    FechaCese: Date,
    PeriododeVacaciones: number,
    FechaReingreso: Date,
    Fecha_Ult_Actualizacion: Date,
    EsReingreso: string,
    Tipo_Cuenta: string,
    FormaCalculo13ro: number,
    FormaCalculo14ro: number,
    BoniComplementaria: number,
    BoniEspecial: number,
    Remuneracion_Minima: number,
    Fondo_Reserva: string
  ): void {
    const url = `/api/Api/trabajador/Edit?` +
      `COMP_Codigo=${COMP_Codigo}` +
      `&Id_Trabajador=${Id_Trabajador}` +
      `&Tipo_trabajador=${Tipo_trabajador}` +
      `&Apellido_Paterno=${Apellido_Paterno}` +
      `&Apellido_Materno=${Apellido_Materno}` +
      `&Nombres=${Nombres}` +
      `&Identificacion=${Identificacion}` +
      `&Entidad_Bancaria=${Entidad_Bancaria}` +
      `&CarnetIESS=${CarnetIESS}` +
      `&Direccion=${Direccion}` +
      `&Telefono_Fijo=${Telefono_Fijo}` +
      `&Telefono_Movil=${Telefono_Movil}` +
      `&Genero=${Genero}` +
      `&Nro_Cuenta_Bancaria=${Nro_Cuenta_Bancaria}` +
      `&Codigo_Categoria_Ocupacion=${Codigo_Categoria_Ocupacion}` +
      `&Ocupacion=${Ocupacion}` +
      `&Centro_Costos=${Centro_Costos}` +
      `&Nivel_Salarial=${Nivel_Salarial}` +
      `&EstadoTrabajador=${EstadoTrabajador}` +
      `&Tipo_Contrato=${Tipo_Contrato}` +
      `&Tipo_Cese=${Tipo_Cese}` +
      `&EstadoCivil=${EstadoCivil}` +
      `&TipodeComision=${TipodeComision}` +
      `&FechaNacimiento=${FechaNacimiento.toISOString()}` +
      `&FechaIngreso=${FechaIngreso.toISOString()}` +
      `&FechaCese=${FechaCese.toISOString()}` +
      `&PeriododeVacaciones=${PeriododeVacaciones}` +
      `&FechaReingreso=${FechaReingreso.toISOString()}` +
      `&Fecha_Ult_Actualizacion=${Fecha_Ult_Actualizacion.toISOString()}` +
      `&EsReingreso=${EsReingreso}` +
      `&Tipo_Cuenta=${Tipo_Cuenta}` +
      `&FormaCalculo13ro=${FormaCalculo13ro}` +
      `&FormaCalculo14ro=${FormaCalculo14ro}` +
      `&BoniComplementaria=${BoniComplementaria}` +
      `&BoniEspecial=${BoniEspecial}` +
      `&Remuneracion_Minima=${Remuneracion_Minima}` +
      `&Fondo_Reserva=${Fondo_Reserva}`;
    this.http.post(url, null).subscribe(
      (response) => {
        Swal.fire({
          title: 'Cambios guardados',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.fetchTrabajadores();
        });
      },
      (error) => {
        console.error(error);
        //Swal.fire('Error al guardar los cambios', '', 'error');
        Swal.fire({
          title: 'Cambios guardados',
          icon: 'success',
          showCancelButton: false,
        }).then(() => {
          this.fetchTrabajadores();
        });
      }
    );
  }
  
  

  onlyLettersAndNumbers(event: KeyboardEvent): void {
    const input = event.key;
    const isLetterOrNumber = /^[a-zA-Z0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab' || event.code === 'Space';
  
    if (!isLetterOrNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }
  
  onlyNumbers(event: KeyboardEvent): void {
    const input = event.key;
    const isNumber = /^[0-9]+$/.test(input);
    const isAllowedKey = event.code === 'Backspace' || event.code === 'Delete' || event.code === 'Tab';
  
    if (!isNumber && !isAllowedKey) {
      event.preventDefault();
    }
  }

  


  validarIdentificacion(campo: string) {
    // Obtén el valor del campo de identificación
    let cad = ''
    if(campo === "crear"){
      cad = this.identificacion;
    }else{
      cad = this.trabajadorSeleccionado.Identificacion;
    }
    let total = 0;
      let longitud = cad.length;
      let longcheck = longitud - 1;
      let i = 0;
    
      if (cad !== "" && longitud === 10) {
        for (i = 0; i < longcheck; i++) {
          if (i % 2 === 0) {
            var aux = parseInt(cad.charAt(i)) * 2;
            if (aux > 9) aux -= 9;
            total += aux;
          } else {
            total += parseInt(cad.charAt(i));
          }
        }
        total = total % 10 ? 10 - (total % 10) : 0;
        if (parseInt(cad.charAt(longitud - 1)) === total) {
          this.identificacionInvalid = false;
        } else {
          this.identificacionInvalid = true;
        }
      }else{
        this.identificacionInvalid = true;
      }
  } 

  limitarLongitud(event: any, maxLength: number) {
    const input = event.target as HTMLInputElement;
    
    // Limitar la longitud del valor
    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, maxLength);
    }
    
    // Evitar números negativos
    const numericValue = Number(input.value);
    if (numericValue < 0) {
      input.value = '';
    }
  }


  title = 'angular-mat-table-example';

 
  
  columnsToDisplay = ['Identificacion', 'Apellido_Paterno', 'Apellido_Materno', 'Nombres', 'COMP_Codigo'];

  toggleRow(element: { expanded: boolean; }) {
    // Uncommnet to open only single row at once
    // ELEMENT_DATA.forEach(row => {
    //   row.expanded = false;
    // })
    element.expanded = !element.expanded
  }

  manageAllRows(flag: boolean) {
    this.trabajadores.forEach(row => {
      row.expanded = flag;
    })
  }


}

