import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AfiliadosComponent } from './afiliados/afiliados.component';
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

@NgModule({
  declarations: [
    AppComponent,
    AfiliadosComponent,
    ShowAfiliadoComponent,
    AddEditAfiliadoComponent,
    NavigationComponent,
    SideNavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    ThemeModule,
    BrowserAnimationsModule,
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
