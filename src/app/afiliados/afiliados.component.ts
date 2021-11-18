import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ConfirmacionComponent } from '../@core/confirmacion/confirmacion.component';
import { AfiliadoService } from '../services/afiliado.service';
import { MensajeService } from '../services/mensaje.service';
import { AfiliadoFormularioComponent } from './afiliado-formulario/afiliado-formulario.component';
import { AfiliadoAgenteFormularioComponent } from './afiliado-agente-formulario/afiliado-agente-formulario.component'
import { AfiliadoListaComponent } from './afiliado-lista/afiliado-lista.component';

@Component({
  selector: 'app-afiliados',
  templateUrl: './afiliados.component.html',
  styleUrls: ['./afiliados.component.css']
})
export class AfiliadoComponent implements OnInit {

  public cargandoLista: Boolean;

  @ViewChild(AfiliadoListaComponent, { static: false }) lista: AfiliadoListaComponent;
  @ViewChild('txtBusqueda', { static: true }) input: ElementRef;


  constructor(
    private service: AfiliadoService,
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

  public editar(idAfiliado) {
    console.log("editar");
    const dialogRef = this.dialog.open(AfiliadoFormularioComponent, {
      data: {
        idAfiliado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lista.cargarLista();
    });
  }

  public promover(idAfiliado) {
    console.log("promover");
    const dialogRef = this.dialog.open(AfiliadoAgenteFormularioComponent, {
      data: {
        idAfiliado
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.lista.cargarLista();
    });
  }

  
  public eliminar(idAfiliado) {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      data: {
        titulo: 'Dar de baja afiliado',
        mensaje: '¿Esta seguro que desea realizar esta acción?'
      }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        const resultado = await this.service.delete(idAfiliado).toPromise();
        this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);
        this.lista.cargarLista();
      }
    });
  }

  nuevo() {
    const dialogRef = this.dialog.open(AfiliadoFormularioComponent, {
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