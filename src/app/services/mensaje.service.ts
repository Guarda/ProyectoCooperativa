import { CodigoRespuesta } from '../@core/enumerable/codigo-respuesta.enumerable';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MensajeService {

    constructor(private toastr: ToastrService) { }

    generarToastr(codigoRespuesta, titulo, mensaje) {

        switch (codigoRespuesta) {
            case CodigoRespuesta.Exito:
                if (!titulo)
                    titulo = "Transacción realizada con éxito"

                this.toastr.success(mensaje, titulo);
                break;

            case CodigoRespuesta.Advertencia:
                if (!titulo)
                    titulo = "Advertencia"

                this.toastr.warning(mensaje, titulo);
                break;

            case CodigoRespuesta.Error:
                if (!titulo)
                    titulo = "Ha ocurrido un error inesperado"

                this.toastr.error(mensaje, titulo);
                break;
        }

    }
}