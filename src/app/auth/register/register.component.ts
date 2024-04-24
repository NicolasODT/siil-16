import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  

  onSubmit(): void {
    // Vérifie si le formulaire est valide et que les mots de passe correspondent
    if (!this.isFormValid()) {
      this.toastr.error('Veuillez corriger les erreurs dans le formulaire.');
      return;
    }

    // Appel au service d'authentification pour enregistrer le nouvel utilisateur
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.toastr.success('Inscription réussie');
        this.router.navigate(['/home']); // Redirection vers la page d'accueil après inscription réussie
      },
      error: (error) => {
        console.error("Erreur lors de l'inscription", error);
        this.toastr.error('Erreur lors de l\'inscription');
      }
    });
  }

  // Fonction pour vérifier si le formulaire est valide et que les mots de passe correspondent
  isFormValid(): boolean {
    return this.confirmPassword === this.user.password;
  }






}
