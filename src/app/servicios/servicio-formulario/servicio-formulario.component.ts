import { Observable } from 'rxjs';
import { ServicioService } from '../../services/servicio.service';
import { CodigoRespuesta } from './../../@core/enumerable/codigo-respuesta.enumerable';
import { MensajeService } from './../../services/mensaje.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-servicio-formulario',
  templateUrl: './servicio-formulario.component.html',
  styleUrls: ['./servicio-formulario.component.scss']
})
export class ServicioFormularioComponent {
  public accion: string
  public listaEstadoServicio: any;
  public listaServicio: any;
  public servicioForm: any;
  private idServicio: number;
  public lista: any;
  public listaPermiso: any;
  public listaModulo: any;

  constructor(
    public dialogRef: MatDialogRef<ServicioFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ServicioService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
  ) {

    this.listaEstadoServicio = [];
    this.listaServicio = [];
    this.accion = 'Nuevo';
    this.idServicio = null;
    this.lista = [];

    this.servicioForm = this.formBuilder.group({
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
    if (this.data.idServicio) {
      this.idServicio = this.data.idServicio;
      this.obtenerServicio();
    } else {
      this.servicioForm.enable();
    }
  }

  private async obtenerServicio() {
    this.accion = 'Editar';
    const resultado = await this.service.getById(this.idServicio).toPromise();

    this.servicioForm.patchValue({
      Nombre: resultado.dato.nombre,
      CodigoCliente: resultado.dato.codigoCliente,
      Abreviacion: resultado.dato.abreviacion,
      MostrarEtiqueta: resultado.dato.mostrarEtiqueta,
      PermitirPeso: resultado.dato.permitirPeso,
      AgruparRemisionDetalle: resultado.dato.agruparRemisionDetalle
    });

    this.servicioForm.enable();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit(formulario) {
    if (this.servicioForm.valid && this.servicioForm.enabled) {

      this.servicioForm.disable();

      const modServicio = {
        IdServicio: this.idServicio,
        Nombre: formulario.Nombre,
        CodigoCliente: formulario.CodigoCliente,
        Abreviacion: formulario.Abreviacion,
        MostrarEtiqueta: formulario.MostrarEtiqueta,
        PermitirPeso: formulario.PermitirPeso,
        AgruparRemisionDetalle: formulario.AgruparRemisionDetalle
      };

      let resultado;

      if (!this.idServicio)
        resultado = await this.service.post(modServicio).toPromise();
      else {
        resultado = await this.service.put(modServicio).toPromise();
      }

      this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);

      if (resultado.exito === CodigoRespuesta.Exito)
        this.dialogRef.close();

      this.servicioForm.enable();
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
