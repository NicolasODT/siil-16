import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: ''
  };
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.user.password === this.confirmPassword) {
      this.authService.register(this.user).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          // Redirection vers la page d'accueil après inscription
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
        }
      });
    } else {
      console.error('Les mots de passe ne correspondent pas.');
    }
  }
}
