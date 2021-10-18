import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AfiliadoComponent } from '../afiliados/afiliados.component';
import { AgenteComponent } from '../agente/agente.component';
import { ServicioComponent } from '../servicios/servicio.component';
import { PageComponent } from './page.component';



const routes: Routes = [
  {
    path: '',
    component: PageComponent,
    children: [
      { path: 'afiliados', component: AfiliadoComponent },
      {
        path: '',
        redirectTo: 'afiliados',
        pathMatch: 'full'
      },
      { path: 'servicio', component: ServicioComponent },
      {
        path: '',
        redirectTo: 'servicio',
        pathMatch: 'full'
      },
      { path: 'agente', component: AgenteComponent },
      {
        path: '',
        redirectTo: 'agente',
        pathMatch: 'full'
      },
    ],
    
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
