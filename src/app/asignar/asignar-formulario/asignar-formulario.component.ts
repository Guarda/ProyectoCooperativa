import { Observable } from 'rxjs';
import { AsignarService } from './../../services/asignar.service';
import { CodigoRespuesta } from './../../@core/enumerable/codigo-respuesta.enumerable';
import { MensajeService } from './../../services/mensaje.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';
import { AsignarDataSource } from './../../datasource/asignar.datasource';
import { MatPaginator } from '@angular/material/paginator';

import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-asignar-formulario',
  templateUrl: './asignar-formulario.component.html',
  styleUrls: ['./asignar-formulario.component.scss']
})
export class AsignarFormularioComponent {
  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  public valor: string;
  public accion: string
  public listaEstadoAsignar: any;
  public listaAsignar: any;
  public asignarForm: any;
  private idAfiliado: number;
  public lista: any;
  public listaPermiso: any;
  public listaModulo: any;


  displayedColumns = ['idAfiliado', 'nombreAfiliado','apellidoAfiliado']
  dataSource: AsignarDataSource;

  constructor(
    public dialogRef: MatDialogRef<AsignarFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AsignarService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
  ) {

    this.listaEstadoAsignar = [];
    this.listaAsignar = [];
    this.accion = 'Nuevo';
    this.idAfiliado = null;
    this.lista = [];

    this.asignarForm = this.formBuilder.group({
      IdAfiliado: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      NombreAfiliado: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
        ]),
      ],
      ApellidoAfiliado: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
        ]),
      ],
      IdReferente: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      Celular: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      TelefonoDomicilio: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      CorreoElectronico: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      Cedula: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      Direccion1: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      Direccion2: [
        null,
        Validators.compose([
        ]),
      ],
      FechaInscripcion: [
        null,
        Validators.compose([
        ]),
      ],
      IdEstado: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      IdCargo: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      NombreUsuario: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      Contraseña: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      FechaContrato: [
        null,
        Validators.compose([
        ]),
      ],
    });

    this.obtenerInformacion();
    this.inicializarTabla();
  }

  async obtenerInformacion() {
    if (this.data.idAfiliado) {
      this.idAfiliado = this.data.idAfiliado;
      this.obtenerAfiliado();
    } else {
      this.asignarForm.enable();
    }
  }

  private async obtenerAfiliado() {
    this.accion = 'Asignar';
    // comprobar que traiga datos
    const resultado = await this.service.getById(this.idAfiliado).toPromise();
    console.log(resultado);   
    // Mapeas con los nombres de tu formulario    
    // this.asignarForm.patchValue({
    //   IdAfiliado : this.idAfiliado,
    //   NombreAfiliado: resultado.dato.nombreAfiliado,
    //   ApellidoAfiliado: resultado.dato.apellidoAfiliado,
    //   IdReferente: resultado.dato.idReferente,
    //   Celular: resultado.dato.celular,
    //   TelefonoDomicilio: resultado.dato.telefonoDomicilio,
    //   CorreoElectronico: resultado.dato.correoElectronico,
    //   Cedula: resultado.dato.cedula,
    //   Direccion1: resultado.dato.direccion1,
    //   Direccion2: resultado.dato.direccion2,
    //   FechaInscripcion : resultado.dato.fechaInscripcion,
    //   IdEstado : resultado.dato.idEstado,
    //   IdCargo : resultado.dato.idCargo,
    //   NombreUsuario : resultado.dato.nombreUsuario,
    //   Contraseña : resultado.dato.contraseña,
    //   FechaContrato: resultado.dato.fechaContrato
    // });

    this.asignarForm.enable();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  public busqueda(valor: string) {
    this.valor = valor;
    this.paginator.pageIndex = 0;
    this.cargarLista();
  }

  async onSubmit(formulario) {

    console.log(formulario);

    if (this.asignarForm.valid && this.asignarForm.enabled) {

      this.asignarForm.disable();


      // Se crea un modelo por si quiere hacerse algun cambio
      const modAfiliado = {
        IdAfiliado: formulario.IdAfiliado,
        NombreAfiliado: formulario.NombreAfiliado,
        ApellidoAfiliado: formulario.ApellidoAfiliado,
        IdReferente: formulario.IdReferente,
        Celular: formulario.Celular,
        TelefonoDomicilio: formulario.TelefonoDomicilio,
        CorreoElectronico: formulario.CorreoElectronico,
        Cedula: formulario.Cedula,
        Direccion1: formulario.Direccion1,
        Direccion2: formulario.Direccion2,
        FechaInscripcion : formulario.FechaInscripcion,
        IdEstado : formulario.IdEstado,
        IdCargo : formulario.IdCargo,
        NombreUsuario : formulario.NombreUsuario,
        Contraseña : formulario.Contraseña,
        FechaContrato: formulario.FechaContrato
      };

      let resultado;

      if (!this.idAfiliado){
        resultado = await this.service.post(modAfiliado).toPromise();
        console.log("llego1");
      }  
      else {
        resultado = await this.service.put(modAfiliado).toPromise();
      }

      this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);

      if (resultado.exito === CodigoRespuesta.Exito)
        this.dialogRef.close();

      this.asignarForm.enable();
    }
  }

  inicializarTabla() {
    this.dataSource = new AsignarDataSource(this.service, this.mensajeService);
    this.dataSource.loadAsignarAgente();
  }

  public cargarLista() {
    this.dataSource.loadAsignarAgente(
      this.valor,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  obtenerMensajeError(control: FormControl) {
    return control.hasError('required') ? 'Este campo es requerido' :
      control.hasError('email') ? ' El correo electrónico es inválido.' :
        control.hasError('maxlength') ? 'Ha excedido el máximo de caracteres permitidos' :
          control.hasError('minlength') ? 'Aún no ha ingresado la cantidad mínima de caracteres' :
            control.hasError('contrasenaInvalida') ? 'Las contraseñas no coinciden' :
              control.hasError('validacionServidorFallida') ? 'Error al contactarse con el servidor, inténtelo de nuevo.' :
                '';
  }
}
