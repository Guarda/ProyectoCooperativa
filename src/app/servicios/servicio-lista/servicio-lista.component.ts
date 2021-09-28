import { MensajeService } from './../../services/mensaje.service';
import { ServicioDataSource } from './../../datasource/servicio.datasource';
import { ServicioService } from './../../services/servicio.service';
import { Component, ViewChild, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-servicio-lista',
  templateUrl: './servicio-lista.component.html',
  styleUrls: ['./servicio-lista.component.scss']
})
export class ServicioListaComponent implements OnInit, AfterViewInit {

  public valor: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Output() editarEmitter;
  @Output() eliminarEmitter;
  @Output() editarAPIemitter;


  displayedColumns = ['idServicio', 'nombreServicio', 'apellidoServicio', 'accion'];
  dataSource: ServicioDataSource;

  constructor(
    private service: ServicioService,
    private mensajeService: MensajeService,
  ) {
    this.editarEmitter = new EventEmitter();
    this.eliminarEmitter = new EventEmitter();
    this.editarAPIemitter = new EventEmitter();

    this.inicializarTabla();
  }

  ngOnInit() {
 
  }

  public busqueda(valor: string) {
    this.valor = valor;
    this.paginator.pageIndex = 0;
    this.cargarLista();
  }


  ngAfterViewInit() {
    console.log(this.sort);
    this.sort.sortChange.subscribe(() => {
      this.paginator.pageIndex = 0
    });


    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.cargarLista())
      )
      .subscribe();
  }

  inicializarTabla() {
    this.dataSource = new ServicioDataSource(this.service, this.mensajeService);
    this.dataSource.loadServicio();
  }

  public cargarLista() {
    this.dataSource.loadServicio(
      this.valor,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  editar(idServicio: number) {
    this.editarEmitter.emit(idServicio);
  }


  editarAPI(idServicio: number) {
    this.editarAPIemitter.emit(idServicio);
  }

  eliminar(idServicio: number) {
    this.eliminarEmitter.emit(idServicio);
  }

}
