import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';  // Pour afficher les messages d'erreur de connexion

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Redirection vers la page d'accueil ou tableau de bord après la connexion réussie
        localStorage.setItem('userToken', response.token);
        localStorage.setItem('userName', response.nom);
        localStorage.setItem('userRole', response.role);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Affichage d'un message d'erreur si la connexion échoue
        console.error('Erreur de connexion', error);
        this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
      }
    });
  }
}
