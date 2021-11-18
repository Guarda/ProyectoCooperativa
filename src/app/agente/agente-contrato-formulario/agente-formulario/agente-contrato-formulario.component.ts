import { Observable } from 'rxjs';
import { AgenteService } from '../../../services/agente.service';
import { CodigoRespuesta } from '../../../@core/enumerable/codigo-respuesta.enumerable';
import { MensajeService } from '../../../services/mensaje.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-agente-contrato-formulario',
  templateUrl: './agente-contrato-formulario.component.html',
  styleUrls: ['./agente-contrato-formulario.component.scss']
})
export class AgenteContratoFormularioComponent {
  public accion: string
  public listaEstadoAgenteContrato: any;
  public listaAgenteContrato: any;
  public agenteForm: any;
<<<<<<< HEAD
  private idAgente: number;
=======
  private idAfiliado: number;
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
  public lista: any;
  public listaPermiso: any;
  public listaModulo: any;

  constructor(
    public dialogRef: MatDialogRef<AgenteContratoFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AgenteService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
  ) {

    this.listaEstadoAgenteContrato = [];
    this.listaAgenteContrato = [];
    this.accion = 'Nuevo';
<<<<<<< HEAD
    this.idAgente = null;
    this.lista = [];

    this.agenteForm = this.formBuilder.group({
      IdAgente: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
=======
    this.idAfiliado = null;
    this.lista = [];

    this.agenteForm = this.formBuilder.group({
     
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
      IdAfiliado: [
        null,
        Validators.compose([
          Validators.required,
        ]),
<<<<<<< HEAD
      ],
      NombreAgente: [
        null,
        Validators.compose([
          Validators.required,
          Validators.maxLength(300),
        ]),
      ],
      ApellidoAgente: [
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
=======
      ],     
      FechaContrato: [
        null,
        Validators.compose([
        ]),
      ],      
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
    });

    this.obtenerInformacion();
  }

  async obtenerInformacion() {
<<<<<<< HEAD
    if (this.data.idAgente) {
      this.idAgente = this.data.idAgente;
=======
    if (this.data.idAfiliado) {
      this.idAfiliado = this.data.idAfiliado;
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
      this.obtenerAgenteContrato();
    } else {
      this.agenteForm.enable();
    }
  }

  private async obtenerAgenteContrato() {
    this.accion = 'Editar';
    // comprobar que traiga datos
<<<<<<< HEAD
    const resultado = await this.service.getById(this.idAgente).toPromise();
    console.log(resultado);   
    // Mapeas con los nombres de tu formulario
    this.agenteForm.patchValue({
      IdAgente : this.idAgente,
      NombreAgente: resultado.dato.nombreAgente,
      ApellidoAgente: resultado.dato.apellidoAgente,
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
      Contraseña : resultado.dato.contraseña
=======
    const resultado = await this.service.getById(this.idAfiliado).toPromise();
    console.log(resultado);   
    // Mapeas con los nombres de tu formulario
    this.agenteForm.patchValue({
      IdAfiliado : resultado.dato.idAfiliado,      
      FechaContrato : resultado.dato.fechaContrato
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
    });

    this.agenteForm.enable();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit(formulario) {

    console.log(formulario);
<<<<<<< HEAD

=======
    console.log(this.agenteForm)
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
    if (this.agenteForm.valid && this.agenteForm.enabled) {

      this.agenteForm.disable();


      // Se crea un modelo por si quiere hacerse algun cambio
      const modAgenteContrato = {
<<<<<<< HEAD
        IdAgente: formulario.IdAgente,
        NombreAgente: formulario.NombreAgente,
        ApellidoAgente: formulario.ApellidoAgente,
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
        Contraseña : formulario.Contraseña
      };

      let resultado;

      if (!this.idAgente)
=======
        IdAfiliado: formulario.IdAfiliado,        
        FechaContrato : formulario.FechaContrato
      };

      let resultado;
      
      if (!this.idAfiliado)
>>>>>>> ea4739de1b4080f9e9404a86450c18096b819829
        resultado = await this.service.post(modAgenteContrato).toPromise();
      else {
        resultado = await this.service.put(modAgenteContrato).toPromise();
      }

      this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);

      if (resultado.exito === CodigoRespuesta.Exito)
        this.dialogRef.close();

      this.agenteForm.enable();
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
