import { ModuleWithProviders } from "@angular/compiler/src/core";
import { NgModule } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSortModule } from "@angular/material/sort";
import { MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from "@angular/material/core";

const BASE_MODULES: any = [
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSidenavModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule, 
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
];

const COMPONENT: any = [

]

@NgModule({
    declarations: [
        ...COMPONENT
    ],
    imports: [
        ...BASE_MODULES
    ],
    exports: [...BASE_MODULES, ...COMPONENT]
})

export class ThemeModule {
    static forRoot(): ModuleWithProviders {
        return <ModuleWithProviders>{
           ngModule: ThemeModule
        };
    }
}