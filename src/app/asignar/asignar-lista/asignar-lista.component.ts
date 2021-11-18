import { MensajeService } from './../../services/mensaje.service';
import { AsignarDataSource } from './../../datasource/asignar.datasource';
import { AsignarService } from './../../services/asignar.service';
import { Component, ViewChild, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-asignar-lista',
  templateUrl: './asignar-lista.component.html',
  styleUrls: ['./asignar-lista.component.scss']
})
export class AsignarListaComponent implements OnInit, AfterViewInit {

  public valor: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  // @Output() editarEmitter;
  // @Output() eliminarEmitter;
  @Output() editarAPIemitter;
  @Output() asignarEmitter;


  displayedColumns = ['idAfiliado', 'nombreAfiliado', 'apellidoAfiliado', 'estado', 'accion'];
  dataSource: AsignarDataSource;

  constructor(
    private service: AsignarService,
    private mensajeService: MensajeService,
  ) {
    // this.editarEmitter = new EventEmitter();
    // this.eliminarEmitter = new EventEmitter();
    this.editarAPIemitter = new EventEmitter();
    this.asignarEmitter = new EventEmitter();
  

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
    this.dataSource = new AsignarDataSource(this.service, this.mensajeService);
    this.dataSource.loadAsignar();
  }

  public cargarLista() {
    this.dataSource.loadAsignar(
      this.valor,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  // editar(idAfiliado: number) {
  //   this.editarEmitter.emit(idAfiliado);
  // }

  asignar(idAfiliado: number) {
    this.asignarEmitter.emit(idAfiliado);
  }

  editarAPI(idAfiliado: number) {
    this.editarAPIemitter.emit(idAfiliado);
  }

  // eliminar(idAfiliado: number) {
  //   this.eliminarEmitter.emit(idAfiliado);
  // }

}
