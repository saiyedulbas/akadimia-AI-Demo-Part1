import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.authenticated$.pipe(take(1), map(user => {
        if (user) { return true; }
        // console.log("Access denied")
        this.router.navigate(['/login'])
        return false;
    }))
    // .subscribe(user => {
    //   if (user) { return true; }

    //   // console.log("Access denied")
    //   this.router.navigate(['/login'])
    //   return false;
    // })
  }

}
