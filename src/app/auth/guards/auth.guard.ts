import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; // Importation correcte pour jwt-decode

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const { jwtToken } = JSON.parse(currentUser); // Ajustement ici
      if (jwtToken) {
        const decodedToken: any = jwtDecode(jwtToken);
        const expirationDate = new Date(decodedToken.exp * 1000);
        const currentDate = new Date();
  
        if (expirationDate > currentDate) {
          return true;
        }
      }
    }
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
    return false;
  }
  
}
