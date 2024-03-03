import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service'; // Assurez-vous que ce service contient les méthodes nécessaires
import { Router } from '@angular/router';


interface UserProfile {
  id: number | null;
  nom: string;
  prenom: string;
  email: string;
  password?: string;  // Le '?' rend la propriété password optionnelle
  role: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: UserProfile = {
    id: null,
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: ''
  };
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    // Récupérez l'ID de l'utilisateur à partir du localStorage
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.authService.getUserProfile().subscribe({ 
        next: (userData) => {
          this.user = userData;
        },
        error: (error) => {
          console.error('Erreur lors du chargement du profil', error);
        }
      });
    } else {
      console.error("L'ID utilisateur n'est pas disponible.");
    }
  }

  onUpdateProfile(): void {
    if (this.user.password && this.user.password !== this.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas.');
      return;
    }
    
    const updateData = { ...this.user };
    if ('password' in updateData) {
      delete updateData.password;
    }
    

    this.authService.updateProfile(updateData).subscribe({
      next: (response) => {
        console.log('Profil mis à jour', response);
        console.log('Données envoyées pour la mise à jour :', updateData);

      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    });
  }

  onDeleteProfile(): void {
    if (this.user.id === null) {
      console.error("L'ID utilisateur est null, suppression impossible.");
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.authService.deleteProfile(this.user.id).subscribe({
        next: (response) => {
          console.log('Compte supprimé', response);
          this.router.navigate(['/login']); // Redirigez l'utilisateur après la suppression
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du compte', error);
        }
      });
    }
  }
}
