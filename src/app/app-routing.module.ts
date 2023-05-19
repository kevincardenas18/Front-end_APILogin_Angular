import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InsertarComponent } from './insertar/insertar.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { EditarComponent } from './editar/editar.component';
import { MovimientoPlanillaComponent } from './movimiento-planilla/movimiento-planilla.component';  
import { AuthGuard } from './auth.guard';  

const routes: Routes = [{ path: '', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'insertar', component: InsertarComponent },
{ path: 'busqueda', component: BusquedaComponent },
{ path: 'editar', component: EditarComponent },
{ path: 'centrocostos/editar/:id', component: EditarComponent },
{ path: 'movimientoPlanilla', component: MovimientoPlanillaComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
