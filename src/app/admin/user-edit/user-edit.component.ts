import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  id: number = 0;
  user: any = {}; // Remplacez any par le modèle d'utilisateur si vous en avez un
  isLoaded: boolean = false; // Utilisé pour contrôler l'affichage du formulaire après le chargement des données de l'utilisateur

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  confirmPassword: string = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadUser();
  }
  
  loadUser(): void {
    this.authService.getUserById(this.id).subscribe({
      next: (data) => {
        console.log('Utilisateur chargé:', data); // Vous devriez voir l'objet utilisateur ici
        this.user = data;
        this.user.password = '';
        this.isLoaded = true;
      },
      error: (err) => {
        console.error('Erreur lors du chargement de l’utilisateur :', err);
      }
    });
  }
  
  onSubmit(): void {
    console.log('Envoi du formulaire avec l’utilisateur:', this.user); // Vérifiez les données avant l'envoi
    if (this.user.password && this.user.password !== this.confirmPassword) {
      console.error('Les mots de passe ne correspondent pas.');
      alert('Les mots de passe ne correspondent pas.');
      return;
    }
    this.authService.updateUser(this.id, this.user).subscribe({
      next: () => {
        alert('Utilisateur mis à jour avec succès.');
        this.router.navigate(['/admin/user-management']);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l’utilisateur :', err);
      }
    });
  }
  

  onDelete(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.authService.deleteUser(this.id).subscribe({
        next: () => {
          alert('Utilisateur supprimé avec succès.');
          this.router.navigate(['/admin/user-management']); // Ajustez selon vos routes
        },
        error: (err) => {
          console.error('Erreur lors de la suppression de l’utilisateur :', err);
          // Gestion de l'erreur
        }
      });
    }
  }
}
