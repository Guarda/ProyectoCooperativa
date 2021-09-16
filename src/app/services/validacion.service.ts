import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionService {

  constructor() { }


  comprobarPermiso(idPermiso: string) {
    const listaPermiso = JSON.parse(sessionStorage.getItem("ListaPermiso"));

    return listaPermiso.indexOf(idPermiso) > -1;
  }
}