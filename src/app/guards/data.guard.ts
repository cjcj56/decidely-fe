import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from '../content/services/data.service';

@Injectable({providedIn: 'root'})
export class DataGuard implements CanActivate {
    constructor(private dataService: DataService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        switch (route.url.toString()) {
            case 'options-n-factors':
                if (!this.dataService.decision) {
                    return this.router.createUrlTree(['/decision']);
                }
                return true;
            case 'matrix':
                if (!this.dataService.decision) {
                    return this.router.createUrlTree(['/decision']);
                } else if (!this.dataService.options || !this.dataService.decision) {
                    return this.router.createUrlTree(['/options-n-factors']);
                }
                return true;
            case 'recommendations':
                if (!this.dataService.decision) {
                    return this.router.createUrlTree(['/decision']);
                } else if (!this.dataService.options || !this.dataService.decision) {
                    return this.router.createUrlTree(['/options-n-factors']);
                } else if (!this.dataService.scores) {
                    return this.router.createUrlTree(['/matrix']);
                }
                return true;
        }
    }
}
