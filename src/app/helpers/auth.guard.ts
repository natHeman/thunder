import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger
        const user = this.authenticationService.currentUserValue;
        if (user && route.data['roles']) {
            if (route.data['roles'] && route.data['roles'].indexOf(user.isadmin) === -1) {
                // role not authorised so redirect to home page
                // this.router.navigate(['/']);
                return true;
            }

            // authorised so return true
             this.router.navigate(['/']);
            return false;
        }else if(user){
            if (route.data['roles'] && route.data['roles'].indexOf(user.isadmin) === -1) {
                // role not authorised so redirect to home page
                // this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            //  this.router.navigate(['/']);
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}