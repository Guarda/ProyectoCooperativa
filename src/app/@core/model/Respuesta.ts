export class Respuesta {
    exito: number;
    mensaje: string;
    dato: any;

    constructor(exito: number, mensaje:string, dato:any) {
        this.exito = exito;
        this.mensaje = mensaje;
        this.dato = dato;
    }
}

