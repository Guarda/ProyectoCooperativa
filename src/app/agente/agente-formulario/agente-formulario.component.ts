import { Observable } from 'rxjs';
import { AgenteService } from './../../services/agente.service';
import { CodigoRespuesta } from './../../@core/enumerable/codigo-respuesta.enumerable';
import { MensajeService } from './../../services/mensaje.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-agente-formulario',
  templateUrl: './agente-formulario.component.html',
  styleUrls: ['./agente-formulario.component.scss']
})
export class AgenteFormularioComponent {
  public accion: string
  public listaEstadoAgente: any;
  public listaAgente: any;
  public agenteForm: any;
  private idAgente: number;
  public lista: any;
  public listaPermiso: any;
  public listaModulo: any;

  constructor(
    public dialogRef: MatDialogRef<AgenteFormularioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: AgenteService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService,
  ) {

    this.listaEstadoAgente = [];
    this.listaAgente = [];
    this.accion = 'Nuevo';
    this.idAgente = null;
    this.lista = [];

    this.agenteForm = this.formBuilder.group({
      IdAgente: [
        null,
        Validators.compose([
          Validators.required,
        ]),
      ],
      IdAfiliado: [
        null,
        Validators.compose([
          Validators.required,
        ]),
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
      FechaContrato: [
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
    });

    this.obtenerInformacion();
  }

  async obtenerInformacion() {
    if (this.data.idAgente) {
      this.idAgente = this.data.idAgente;
      this.obtenerAgente();
    } else {
      this.agenteForm.enable();
    }
  }

  private async obtenerAgente() {
    this.accion = 'Editar';
    // comprobar que traiga datos
    const resultado = await this.service.getById(this.idAgente).toPromise();
    console.log(resultado);
    // Mapeas con los nombres de tu formulario
    this.agenteForm.patchValue({
      IdAfiliado: resultado.dato.idAfiliado,
      IdAgente: this.idAgente,
      NombreAgente: resultado.dato.nombreAgente,
      ApellidoAgente: resultado.dato.apellidoAgente,
      FechaContrato: resultado.dato.fechaContrato,          
      IdEstado: resultado.dato.idEstado
         
    });

    this.agenteForm.enable();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  async onSubmit(formulario) {

    console.log(formulario);
    console.log(this.agenteForm)
    if (this.agenteForm.valid && this.agenteForm.enabled) {

      this.agenteForm.disable();
      console.log("enviado 1")

      // Se crea un modelo por si quiere hacerse algun cambio
      const modAgente = {
        IdAfiliado: formulario.IdAfiliado,
        IdAgente: formulario.IdAgente,
        NombreAgente: formulario.NombreAgente,
        ApellidoAgente: formulario.ApellidoAgente,
        FechaContrato: formulario.FechaContrato,              
        IdEstado: formulario.IdEstado
        
      };

      let resultado;

      if (!this.idAgente){
        resultado = await this.service.post(modAgente).toPromise();
        console.log("enviado");
      }
      else {
        resultado = await this.service.put(modAgente).toPromise();
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
