import { MensajeService } from './../../services/mensaje.service';
import { AfiliadoDataSource } from './../../datasource/afiliado.datasource';
import { AfiliadoService } from './../../services/afiliado.service';
import { Component, ViewChild, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-afiliado-lista',
  templateUrl: './afiliado-lista.component.html',
  styleUrls: ['./afiliado-lista.component.scss']
})
export class AfiliadoListaComponent implements OnInit, AfterViewInit {

  public valor: string;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  @Output() editarEmitter;
  @Output() eliminarEmitter;
  @Output() editarAPIemitter;


  displayedColumns = ['idAfiliado', 'nombreAfiliado', 'apellidoAfiliado', 'estado', 'accion'];
  dataSource: AfiliadoDataSource;

  constructor(
    private service: AfiliadoService,
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
    this.dataSource = new AfiliadoDataSource(this.service, this.mensajeService);
    this.dataSource.loadAfiliado();
  }

  public cargarLista() {
    this.dataSource.loadAfiliado(
      this.valor,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  editar(idAfiliado: number) {
    this.editarEmitter.emit(idAfiliado);
  }


  editarAPI(idAfiliado: number) {
    this.editarAPIemitter.emit(idAfiliado);
  }

  eliminar(idAfiliado: number) {
    this.eliminarEmitter.emit(idAfiliado);
  }

}
