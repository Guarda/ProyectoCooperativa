import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { Respuesta } from '../@core/model/Respuesta';
import { map, catchError } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {

  private url  = `${environment.APIUrl}/afiliados`;

  constructor(
    private http: HttpClient, 
    private errorService: ErrorService
    ) { }

  get(): Observable<Respuesta> | any {
    return this.http.get<Respuesta>(this.url).pipe(
      map(
        (result: Respuesta) => {
          return result;
        }
      ),
      catchError((error, data) => {
        return this.errorService.handleError(error);
      })
    )
  }

  addAfiliado(val: any) {
    return this.http.post(this.url, val);
  }

  updateAfiliado(val: any) {
    return this.http.put(this.url, val);
  }

  deleteAfiliado(val: any) {
    return this.http.delete(`${this.url}/${val}`);
  }
}
