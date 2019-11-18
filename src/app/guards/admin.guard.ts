import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router : Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    let usuario = localStorage.getItem('permission');
    console.log(usuario);
    if (usuario === 'manager') {
      return true;
    } else {
      this.router.navigate(['home']);
    }
  }
  
}
