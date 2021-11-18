import { MensajeService } from './../services/mensaje.service';
import { CodigoRespuesta } from './../@core/enumerable/codigo-respuesta.enumerable';
import { Respuesta } from '../@core/model/respuesta';
import { catchError, finalize } from 'rxjs/operators';
import { AsignarService } from './../services/asignar.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { CollectionViewer } from '@angular/cdk/collections';

export class AsignarDataSource implements DataSource<any> {

  private asignarSubject = new BehaviorSubject<any>([]);
  private cantidadRegistroSubject = new BehaviorSubject<number>(0);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public cargandoRegistro = this.loadingSubject.asObservable();
  public cantidadRegistro = this.cantidadRegistroSubject.asObservable();

  constructor(
    private service: AsignarService,
    private mensajeService: MensajeService
  ) { }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<any> {
    return this.asignarSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.asignarSubject.complete();
    this.loadingSubject.complete();
  }

  loadAsignar(
    filter = '',
    sortActive = '',
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 10
  ) {

    this.loadingSubject.next(true);

    this.service.datatable(filter, sortActive, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resultado: Respuesta) => {
console.log(resultado);
        if (resultado.exito === CodigoRespuesta.Exito) {
          this.cantidadRegistroSubject.next(resultado.dato.cantidadRegistro)
          this.asignarSubject.next(resultado.dato.lista)
        } else {
          this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);
          this.loadingSubject.next(true);
        }
      });

  }

  loadAsignarAgente(
    filter = '',
    sortActive = '',
    sortDirection = 'asc',
    pageIndex = 0,
    pageSize = 10
  ) {

    this.loadingSubject.next(true);

    this.service.datatableasignar(filter, sortActive, sortDirection, pageIndex, pageSize)
      .pipe(
        catchError(() => of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe((resultado: Respuesta) => {
console.log(resultado);
        if (resultado.exito === CodigoRespuesta.Exito) {
          this.cantidadRegistroSubject.next(resultado.dato.cantidadRegistro)
          this.asignarSubject.next(resultado.dato.lista)
        } else {
          this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);
          this.loadingSubject.next(true);
        }
      });

  }
}