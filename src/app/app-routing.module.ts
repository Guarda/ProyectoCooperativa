import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {AfiliadosComponent} from './afiliados/afiliados.component';


const routes: Routes = [
  {path:'afiliados',component:AfiliadosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
