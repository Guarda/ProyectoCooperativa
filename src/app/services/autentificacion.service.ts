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
export class AutenticacionService {
    private url = `${environment.APIUrl}/Autenticacion`

    constructor(private http: HttpClient, private errorService: ErrorService) { }

    post(autenticacion: any): Observable<Respuesta> {
        const body = JSON.stringify(autenticacion);

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
   
}