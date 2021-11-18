import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/authGuard';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {
    path: 'page',
    canActivate: [AuthGuard],
    loadChildren: () => import('./page/page.module').then(m => m.PageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
