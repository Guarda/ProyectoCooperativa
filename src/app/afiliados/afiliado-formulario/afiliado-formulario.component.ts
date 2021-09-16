import { Observable } from 'rxjs';
import { AfiliadoService } from './../../services/afiliado.service';
import { CodigoRespuesta } from './../../@core/enumerable/codigo-respuesta.enumerable';
import { MensajeService } from './../../services/mensaje.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-afiliado-formulario',
  templateUrl: './afiliado-formulario.component.html',
  styleUrls: ['./afiliado-formulario.component.scss']
})
export class AfiliadoFormularioComponent {
  public accion: string
  public listaEstadoAfiliado: any;
  public listaAfiliado: any;
  public afiliadoForm: any;
  private idAfiliado: number;
  public lista: any;
  public listaPermiso: any;
  public listaModulo: any;

  constructor(
    public dialogRef: MatDialogRef<AfiliadoFormularioComponent>,
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
      Nombre: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(100),

        ]),
      ],
      Abreviacion: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(20),
        ]),
      ],
      CodigoCliente: [
        null,
        Validators.compose([
          Validators.maxLength(6),
        ]),
      ],
      MostrarEtiqueta: [
        false
      ],
      PermitirPeso: [
        false
      ],
      AgruparRemisionDetalle: [
        false
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
    this.accion = 'Editar';
    const resultado = await this.service.getById(this.idAfiliado).toPromise();

    this.afiliadoForm.patchValue({
      Nombre: resultado.dato.nombre,
      CodigoCliente: resultado.dato.codigoCliente,
      Abreviacion: resultado.dato.abreviacion,
      MostrarEtiqueta: resultado.dato.mostrarEtiqueta,
      PermitirPeso: resultado.dato.permitirPeso,
      AgruparRemisionDetalle: resultado.dato.agruparRemisionDetalle
    });

    this.afiliadoForm.enable();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit(formulario) {
    if (this.afiliadoForm.valid && this.afiliadoForm.enabled) {

      this.afiliadoForm.disable();

      const modAfiliado = {
        IdAfiliado: this.idAfiliado,
        Nombre: formulario.Nombre,
        CodigoCliente: formulario.CodigoCliente,
        Abreviacion: formulario.Abreviacion,
        MostrarEtiqueta: formulario.MostrarEtiqueta,
        PermitirPeso: formulario.PermitirPeso,
        AgruparRemisionDetalle: formulario.AgruparRemisionDetalle
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
