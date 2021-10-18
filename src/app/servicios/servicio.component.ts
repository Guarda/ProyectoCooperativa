import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmacionComponent } from '../@core/confirmacion/confirmacion.component';
import { ServicioService } from '../services/servicio.service';
import { MensajeService } from '../services/mensaje.service';
import { ServicioFormularioComponent } from './servicio-formulario/servicio-formulario.component';
import { ServicioListaComponent } from './servicio-lista/servicio-lista.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {

  public cargandoLista: Boolean;

  @ViewChild(ServicioListaComponent, { static: false }) lista: ServicioListaComponent;
  @ViewChild('txtBusqueda', { static: true }) input: ElementRef;


  constructor(
    private service: ServicioService,
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

  public editar(IdServicio) {
    const dialogRef = this.dialog.open(ServicioFormularioComponent, {
      data: {
        IdServicio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lista.cargarLista();
    });
  }

  
  public eliminar(IdServicio) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: {
        titulo: 'Dar de baja Servicio',
        mensaje: '¿Esta seguro que desea realizar esta acción?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const resultado = await this.service.delete(IdServicio).toPromise();
        this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);
        this.lista.cargarLista();
      }
    });
  }

  nuevo() {
    const dialogRef = this.dialog.open(ServicioFormularioComponent, {
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