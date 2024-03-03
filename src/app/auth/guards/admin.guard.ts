import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = localStorage.getItem('userRole');
    if (userRole === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}