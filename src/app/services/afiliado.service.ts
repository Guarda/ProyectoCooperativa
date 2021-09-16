
import { ErrorService } from './error.service';
import { Respuesta } from '../@core/model/respuesta';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AfiliadoService {
  private url = `${environment.APIUrl}/Afiliado`

  constructor(private http: HttpClient, private errorService: ErrorService) { }

  get(): Observable<Respuesta> {
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

  getById(idAfiliado: number): Observable<Respuesta> {
    return this.http.get<Respuesta>(
      `${this.url}/${idAfiliado}`
    ).pipe(
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


  validarNombreAfiliado(value: any, idAfiliado: number): Observable<Respuesta> {
    const body = JSON.stringify({
      NombreAfiliado: value,
      IdAfiliado: idAfiliado
    });

    return this.http.post<Respuesta>(
      `${this.url}/ValidarNombreAfiliado`,
      body,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(
        map((result: Respuesta) => {
          return result;
        }),
        catchError(
          (error) => {
            return this.errorService.handleError(error);
          })
      );

  }


  post(afiliado: any): Observable<Respuesta> {
    const body = JSON.stringify(afiliado);

    return this.http.post<Respuesta>(
      this.url,
      body,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(
        map((result: Respuesta) => {
          return result;
        }),
        catchError(
          (error) => {
            return this.errorService.handleError(error);
          })
      );
  }

  put(afiliado: any): Observable<Respuesta> {
    const body = JSON.stringify(afiliado);

    return this.http.put<Respuesta>(
      this.url,
      body,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(
        map((result: Respuesta) => {
          return result;
        }),
        catchError(
          (error) => {
            return this.errorService.handleError(error);
          })
      );
  }

  delete(idAfiliado: number): Observable<Respuesta> {
    return this.http.delete<Respuesta>(
      `${this.url}/${idAfiliado}`
    ).pipe(
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


  datatable(
    filter: string,
    sortActive: string,
    sortOrder: string,
    pageNumber: number,
    pageSize: number
  ): Observable<Respuesta> {

    return this.http.get<Respuesta>(
      `${this.url}/DataTable`,
      {
        params: new HttpParams()
          .set('filter', filter)
          .set('sortActive', sortActive)
          .set('sortOrder', sortOrder)
          .set('pageNumber', pageNumber.toString())
          .set('pageSize', pageSize.toString())
      }
    ).pipe(
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

  validarIniciales(value: any, idAfiliado: number) {
    const body = JSON.stringify({
      Iniciales: value,
      IdAfiliado: idAfiliado
    });

    return this.http.post<Respuesta>(
      `${this.url}/ValidarCodigoSISGO`,
      body,
      {
        headers: new HttpHeaders().set('content-type', 'application/json')
      }).pipe(


map((result: Respuesta) => {
          return result;
        }),
        catchError(
          (error) => {
            return this.errorService.handleError(error);
          })
      );
  }
}