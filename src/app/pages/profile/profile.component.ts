import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';


interface UserProfile {
  id: number | null;
  nom: string;
  prenom: string;
  email: string;
  role: string;
  // Vous ne stockez pas le mot de passe dans le JWT, mais vous aurez besoin de cette propriété pour la mise à jour du mot de passe.
  password?: string;
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
    role: '',
    password: ''
  };
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfileFromToken();
  }

  loadUserProfileFromToken(): void {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const decodedToken: any = jwtDecode(JSON.parse(currentUser).jwtToken);
      this.user.id = decodedToken.id;
      this.user.nom = decodedToken.nom;
      this.user.prenom = decodedToken.prenom;
      this.user.email = decodedToken.sub; 
      this.user.role = decodedToken.role;
    } else {
      console.error("Les informations de l'utilisateur ne sont pas disponibles.");
    }
  }
  
  onUpdateProfile(): void {
    if (this.user.password && this.user.password !== this.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas.');
      return;
    }

    const updateData: any = { ...this.user };
    if (!this.user.password) {
      delete updateData.password; // Si le mot de passe n'est pas fourni, ne l'incluez pas
    }

    if (this.user.id) {
      this.authService.updateUser(this.user.id, updateData).subscribe({
        next: (response) => {
          console.log('Profil mis à jour', response);
          this.updateLocalUserData(response); // Supposons que response contienne le nouveau JWT ou les nouvelles données utilisateur
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du profil', error);
        }
      });
    } else {
      console.error("L'ID utilisateur est null, mise à jour impossible.");
    }
}

// Méthode pour mettre à jour les données de l'utilisateur dans le localStorage
updateLocalUserData(response: any): void {
  // Supposons que response contient un nouveau token JWT
  localStorage.setItem('currentUser', JSON.stringify({ jwtToken: response.jwtToken }));

  this.loadUserProfileFromToken();

}

  onDeleteProfile(): void {
    // Assurez-vous que l'utilisateur actuel est bien récupéré à partir du token JWT.
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      console.error("Informations de l'utilisateur non disponibles.");
      return;
    }
    
    // Décodez le token pour obtenir l'ID de l'utilisateur.
    const decodedToken: any = jwtDecode(JSON.parse(currentUser).jwtToken);
    const userId = decodedToken.id;
  
    if (!userId) {
      console.error("L'ID utilisateur est null, suppression impossible.");
      return;
    }
  
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ?')) {
      this.authService.deleteProfile(userId).subscribe({
        next: (response) => {
          console.log('Compte supprimé', response);
          localStorage.removeItem('currentUser'); // Assurez-vous de supprimer le token stocké après la suppression du compte.
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du compte', error);
        }
      });
    }
  }
  }
  
