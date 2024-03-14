import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; 

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const { jwtToken } = JSON.parse(currentUser); // Ajustement ici
      if (jwtToken) {
        const decodedToken: any = jwtDecode(jwtToken);
        if (decodedToken.role && decodedToken.role === 'Admin') {
          return true;
        }
      }
    }
    this.router.navigate(['/home']);
    return false;
  }
  
}
