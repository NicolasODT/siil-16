import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Pour afficher les messages d'erreur de connexion

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService // Injecte le ToastrService ici
  ) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.jwtToken) {
          this.toastr.success('Connexion réussie!', 'Succès'); // Affiche un toast de succès
          // Redirection vers la page d'accueil après une connexion réussie
          this.router.navigate(['/home']);
        } else {
          // En cas d'erreur (token non reçu), affiche un toast d'erreur
          this.toastr.error('Connexion échouée. Veuillez vérifier vos identifiants.', 'Erreur');
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        // Affiche un toast d'erreur
        this.toastr.error('Nom d’utilisateur ou mot de passe incorrect.', 'Erreur');
      }
    });
  }

  ngOnInit(): void {
    // Appelé lorsque le composant est créé
    this.authService.showNavbar(false);
    this.authService.onLoginPage = true;
  }

  ngOnDestroy(): void {
    // Appelé juste avant que le composant ne soit détruit
    this.authService.showNavbar(true);
    this.authService.onLoginPage = false;
  }
}
