import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmacionComponent } from '../@core/confirmacion/confirmacion.component';
import { AgenteService } from '../services/agente.service';
import { MensajeService } from '../services/mensaje.service';
import { AgenteFormularioComponent } from './agente-formulario/agente-formulario.component';
import { AgenteListaComponent } from './agente-lista/agente-lista.component';

@Component({
  selector: 'app-agente',
  templateUrl: './agente.component.html',
  styleUrls: ['./agente.component.css']
})
export class AgenteComponent implements OnInit {

  public cargandoLista: Boolean;

  @ViewChild(AgenteListaComponent, { static: false }) lista: AgenteListaComponent;
  @ViewChild('txtBusqueda', { static: true }) input: ElementRef;


  constructor(
    private service: AgenteService,
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

  public editar(idAgente) {
    const dialogRef = this.dialog.open(AgenteFormularioComponent, {
      data: {
        idAgente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lista.cargarLista();
    });
  }

  
  public eliminar(idAgente) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: {
        titulo: 'Dar de baja agente',
        mensaje: '¿Esta seguro que desea realizar esta acción?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const resultado = await this.service.delete(idAgente).toPromise();
        this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);
        this.lista.cargarLista();
      }
    });
  }

  nuevo() {
    const dialogRef = this.dialog.open(AgenteFormularioComponent, {
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