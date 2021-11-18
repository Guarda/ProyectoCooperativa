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
  private idAfiliado: number;
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
    this.idAfiliado = null;
    this.lista = [];

    this.agenteForm = this.formBuilder.group({
     
      IdAfiliado: [
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
  }

  async obtenerInformacion() {
    if (this.data.idAfiliado) {
      this.idAfiliado = this.data.idAfiliado;
      this.obtenerAgenteContrato();
    } else {
      this.agenteForm.enable();
    }
  }

  private async obtenerAgenteContrato() {
    this.accion = 'Editar';
    // comprobar que traiga datos
    const resultado = await this.service.getById(this.idAfiliado).toPromise();
    console.log(resultado);   
    // Mapeas con los nombres de tu formulario
    this.agenteForm.patchValue({
      IdAfiliado : resultado.dato.idAfiliado,      
      FechaContrato : resultado.dato.fechaContrato
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


      // Se crea un modelo por si quiere hacerse algun cambio
      const modAgenteContrato = {
        IdAfiliado: formulario.IdAfiliado,        
        FechaContrato : formulario.FechaContrato
      };

      let resultado;
      
      if (!this.idAfiliado)
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
