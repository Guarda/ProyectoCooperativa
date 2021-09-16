import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { ThemeModule } from '../theme/theme.module';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PageRoutingModule } from './page-routing.module';



@NgModule({
  declarations: [
    PageComponent, 
    SideNavComponent,
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    ThemeModule,
  ]
})
export class PageModule { }
