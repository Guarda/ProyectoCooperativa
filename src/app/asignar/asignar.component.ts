import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmacionComponent } from '../@core/confirmacion/confirmacion.component';
import { AsignarService } from '../services/asignar.service';
import { MensajeService } from '../services/mensaje.service';
import { AsignarFormularioComponent } from './asignar-formulario/asignar-formulario.component';
import { AsignarListaComponent } from './asignar-lista/asignar-lista.component';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {

  public cargandoLista: Boolean;

  @ViewChild(AsignarListaComponent, { static: false }) lista: AsignarListaComponent;
  @ViewChild('txtBusqueda', { static: true }) input: ElementRef;


  constructor(
    private service: AsignarService,
    private dialog: MatDialog,
    private mensajeService: MensajeService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
   
  }

  ngOnInit() {

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        tap(() => {
          this.lista.busqueda(this.input.nativeElement.value);
        })
      )
      .subscribe();
      
  }

  // public editar(idAfiliado) {
  //   console.log("editar");
  //   const dialogRef = this.dialog.open(AsignarFormularioComponent, {
  //     data: {
  //       idAfiliado
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     this.lista.cargarLista();
  //   });
  // }

  public asignar(idAfiliado) {
    console.log("asignar");
    const dialogRef = this.dialog.open(AsignarFormularioComponent, {
      data: {
        idAfiliado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lista.cargarLista();
    });
  }


  
  // public eliminar(idAfiliado) {
  //   const dialogRef = this.dialog.open(ConfirmacionComponent, {
  //     data: {
  //       titulo: 'Dar de baja asignar',
  //       mensaje: '¿Esta seguro que desea realizar esta acción?'
  //     }
  //   });

  //   dialogRef.afterClosed().subscribe(async result => {
  //     if (result) {
  //       const resultado = await this.service.delete(idAfiliado).toPromise();
  //       this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);
  //       this.lista.cargarLista();
  //     }
  //   });
  // }

  nuevo() {
    const dialogRef = this.dialog.open(AsignarFormularioComponent, {
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lista.cargarLista();
    });
  }

  ngAfterViewInit(): void {
    this.lista.dataSource.cargandoRegistro.subscribe(cargandoLista => {
      this.cargandoLista = cargandoLista;
      this.changeDetectorRef.detectChanges();
    });
  }
}