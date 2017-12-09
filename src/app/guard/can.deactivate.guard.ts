import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// export interface CanComponentDeactivate {
//     canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
// }

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {

    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot, nextUrl: any) {
        return component.canDeactivate ? component.canDeactivate(nextUrl) : true;
    }

}