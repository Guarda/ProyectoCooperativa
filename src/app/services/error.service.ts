import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";
import { throwError } from 'rxjs';
import { Respuesta } from '../@core/model/respuesta';
import { CodigoRespuesta } from '../@core/enumerable/codigo-respuesta.enumerable';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private toastr: ToastrService) { }

    async handleError(error: any) {
        const respuestaError = this.obtenerMensaje(error);
        return (new Respuesta(
            respuestaError.exito,
            respuestaError.mensaje,
            null
        ));
    }

    obtenerMensaje(error: any) {
        let mensaje: string;
        let exito = CodigoRespuesta.Error;
        let titulo = 'Ha ocurrido un error inesperado';

        switch (error.status) {
            case 500:
                mensaje = 'Ha ocurrido un error interno en el servidor';
                break;
            case 404:
                mensaje = "No se ha encontrado el recurso";
                break;
            case 401:
                mensaje = "Usted no posee los permisos suficientes para realizar esta acción";
                break;
            case 400:
                mensaje = "Petición inválida";
                break;
            case 0:
                titulo = 'Advertencia';
                exito = CodigoRespuesta.Advertencia;
                mensaje = "Está realizando demasiadas acciones, espere un momento por favor."
                break;
            default:
                mensaje = error.message;
                break;
        }

        return {
            exito,
            mensaje,
            titulo
        }

    }


}