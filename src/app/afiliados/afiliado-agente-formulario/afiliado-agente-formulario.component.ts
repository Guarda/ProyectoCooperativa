import { Observable } from 'rxjs';
import { AfiliadoService } from './../../services/afiliado.service';
import { CodigoRespuesta } from './../../@core/enumerable/codigo-respuesta.enumerable';
import { MensajeService } from './../../services/mensaje.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-afiliado-agente-formulario',
  templateUrl: './afiliado-agente-formulario.component.html',
  styleUrls: ['./afiliado-agente-formulario.component.scss']
})
export class AfiliadoAgenteFormularioComponent {
  public accion: string
  public listaEstadoAfiliado: any;
  public listaAfiliado: any;
  public afiliadoForm: any;
  private idAfiliado: number;
  public lista: any;
  public listaPermiso: any;
  public listaModulo: any;

  constructor(
    public dialogRef: MatDialogRef<AfiliadoAgenteFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AfiliadoService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
  ) {

    this.listaEstadoAfiliado = [];
    this.listaAfiliado = [];
    this.accion = 'Nuevo';
    this.idAfiliado = null;
    this.lista = [];

    this.afiliadoForm = this.formBuilder.group({
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
          Validators.required,
        ]),
      ],
    });

    this.obtenerInformacion();
  }

  async obtenerInformacion() {
    if (this.data.idAfiliado) {
      this.idAfiliado = this.data.idAfiliado;
      this.obtenerAfiliado();
    } else {
      this.afiliadoForm.enable();
    }
  }

  private async obtenerAfiliado() {
    this.accion = 'Promover';
    // comprobar que traiga datos
    const resultado = await this.service.getById(this.idAfiliado).toPromise();
    console.log(resultado);   
    // Mapeas con los nombres de tu formulario
    this.afiliadoForm.patchValue({
      IdAfiliado : this.idAfiliado,
      NombreAfiliado: resultado.dato.nombreAfiliado,
      ApellidoAfiliado: resultado.dato.apellidoAfiliado,
      IdReferente: resultado.dato.idReferente,
      Celular: resultado.dato.celular,
      TelefonoDomicilio: resultado.dato.telefonoDomicilio,
      CorreoElectronico: resultado.dato.correoElectronico,
      Cedula: resultado.dato.cedula,
      Direccion1: resultado.dato.direccion1,
      Direccion2: resultado.dato.direccion2,
      FechaInscripcion : resultado.dato.fechaInscripcion,
      IdEstado : resultado.dato.idEstado,
      IdCargo : resultado.dato.idCargo,
      NombreUsuario : resultado.dato.nombreUsuario,
      Contraseña : resultado.dato.contraseña,
      FechaContrato: resultado.dato.fechaContrato
    });

    this.afiliadoForm.enable();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit(formulario) {

    console.log(formulario);

    if (this.afiliadoForm.valid && this.afiliadoForm.enabled) {

      this.afiliadoForm.disable();


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

      if (!this.idAfiliado)
        resultado = await this.service.post(modAfiliado).toPromise();
      else {
        resultado = await this.service.put(modAfiliado).toPromise();
      }

      this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);

      if (resultado.exito === CodigoRespuesta.Exito)
        this.dialogRef.close();

      this.afiliadoForm.enable();
    }
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
