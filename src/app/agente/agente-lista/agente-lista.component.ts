import { MensajeService } from './../../services/mensaje.service';
import { AgenteDataSource } from './../../datasource/agente.datasource';
import { AgenteService } from './../../services/agente.service';
import { Component, ViewChild, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-agente-lista',
  templateUrl: './agente-lista.component.html',
  styleUrls: ['./agente-lista.component.scss']
})
export class AgenteListaComponent implements OnInit, AfterViewInit {

  public valor: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Output() editarEmitter;
  @Output() eliminarEmitter;
  @Output() editarAPIemitter;


  displayedColumns = ['idAgente', 'nombreAgente', 'apellidoAgente', 'estado', 'accion'];
  dataSource: AgenteDataSource;

  constructor(
    private service: AgenteService,
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
    this.dataSource = new AgenteDataSource(this.service, this.mensajeService);
    this.dataSource.loadAgente();
  }

  public cargarLista() {
    this.dataSource.loadAgente(
      this.valor,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  editar(idAgente: number) {
    this.editarEmitter.emit(idAgente);
  }


  editarAPI(idAgente: number) {
    this.editarAPIemitter.emit(idAgente);
  }

  eliminar(idAgente: number) {
    this.eliminarEmitter.emit(idAgente);
  }

}
