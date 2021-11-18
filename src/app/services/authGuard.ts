import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean> | boolean {
        const token = localStorage.getItem("token")

        return new Promise(resolve => {
            if (token)
                resolve(true);
            else {
                this.router.navigateByUrl('/login')
                resolve(false);
            }
        })
    }
}