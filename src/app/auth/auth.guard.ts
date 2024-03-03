import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      // L'utilisateur n'est pas connecté, redirige vers la page de connexion
      this.router.navigate(['/login']);
      return false;
    }
  }
}
