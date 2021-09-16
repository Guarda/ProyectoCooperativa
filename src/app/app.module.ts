import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfiliadoComponent } from './afiliados/afiliados.component';
import { ShowAfiliadoComponent } from './afiliados/show-afiliado/show-afiliado.component';
import { AddEditAfiliadoComponent } from './afiliados/add-edit-afiliado/add-edit-afiliado.component';
import {AfiliadoService} from './services/afiliado.service';
import {HttpClientModule} from '@angular/common/http'
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component'
import { ThemeModule } from './theme/theme.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ErrorService } from './services/error.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { PageComponent } from './page/page.component';
import { PageModule } from './page/page.module';
import { AfiliadoListaComponent } from './afiliados/afiliado-lista/afiliado-lista.component';
import { AfiliadoFormularioComponent } from './afiliados/afiliado-formulario/afiliado-formulario.component';

@NgModule({
  declarations: [
    AppComponent,
    AfiliadoComponent,
    AfiliadoFormularioComponent,
    AfiliadoListaComponent,
    ShowAfiliadoComponent,
    AddEditAfiliadoComponent,
    NavigationComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    ThemeModule,
    BrowserAnimationsModule,
    PageModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    ErrorService,
    AfiliadoService,
    ToastrService ,
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
