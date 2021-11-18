import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CodigoRespuesta } from '../@core/enumerable/codigo-respuesta.enumerable';
import { AfiliadoService } from '../services/afiliado.service';
import { AutenticacionService } from '../services/autentificacion.service';
import { MensajeService } from '../services/mensaje.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public autenticacionForm: any;
  public today: number = Date.now();

  constructor(private router: Router,
    private service: AutenticacionService,
    private formBuilder: FormBuilder,
    private mensajeService: MensajeService) {

    this.autenticacionForm = this.formBuilder.group({
      NombreUsuario: [
        null,
        Validators.compose([
        ]),
      ],
      Contraseña: [
        null,
        Validators.compose([
        ]),
      ],
    });

  }

  ngOnInit(): void {
  }

  async onSubmit(formulario) {
    //this.router.navigate(['/page']);
    console.log(formulario);

    if (this.autenticacionForm.valid && this.autenticacionForm.enabled) {

      this.autenticacionForm.disable();


      // Se crea un modelo por si quiere hacerse algun cambio
      const modAfiliado = {
        NombreUsuario: formulario.NombreUsuario,
        Contrasena: formulario.Contraseña
      };

      const resultado = await this.service.post(modAfiliado).toPromise();

      this.mensajeService.generarToastr(resultado.exito, '', resultado.mensaje);

      if (resultado.exito === CodigoRespuesta.Exito) {
        this.router.navigate(['/page']);

        localStorage.setItem("token", resultado.dato.sessionAPI.token);
      }

      this.autenticacionForm.enable();
    }
  }

}
