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
        if (response.jwtToken) {
          // Redirection vers la page d'accueil après une connexion réussie
          this.router.navigate(['/home']);
        } else {
          // En cas d'erreur (token non reçu), afficher un message
          this.errorMessage = 'Connexion échouée. Veuillez vérifier vos identifiants.';
        }
      },
      error: error => {
        console.error('Erreur de connexion', error);
        this.errorMessage = 'Nom d’utilisateur ou mot de passe incorrect.';
      }
    });
  }

}