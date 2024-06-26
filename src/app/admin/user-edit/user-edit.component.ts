import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service'; 
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
    private router: Router,
    private toastr: ToastrService
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
      this.toastr.error('Les mots de passe ne correspondent pas.'); // Utilise Toastr ici
      return;
    }
    this.authService.updateUser(this.id, this.user).subscribe({
      next: () => {
        this.toastr.success('Utilisateur mis à jour avec succès.'); // Toastr pour le succès
        this.router.navigate(['/admin/user-management']);
      },
      error: (err) => {
        this.toastr.error('Erreur lors de la mise à jour de l’utilisateur.'); // Toastr pour l'erreur
      }
    });
  }
  

  onDelete(): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Vous ne pourrez pas revenir en arrière!",
      icon: 'warning',
      background: '#191919', // Utilise la couleur de fond de ton choix
      color: '#fff', // Utilise la couleur de texte de ton choix
      buttonsStyling: false, // Désactive le style par défaut des boutons
      customClass: {
        confirmButton: 'btn btn-success', // Classe pour le bouton de confirmation
        cancelButton: 'btn btn-danger' // Classe pour le bouton d'annulation
      },
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annulez!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(this.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'L’utilisateur a été supprimé.',
              icon: 'success',
              background: '#191919', // Même couleur de fond que précédemment
              color: '#fff', // Même couleur de texte que précédemment
              confirmButtonColor: '#74d856', // Couleur du bouton de succès
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-success' // Classe pour le bouton de confirmation
              }
            });
            this.router.navigate(['/admin/user-management']);
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur s’est produite lors de la suppression de l’utilisateur.',
              icon: 'error',
              background: '#191919', // Même couleur de fond que précédemment
              color: '#fff', // Même couleur de texte que précédemment
              confirmButtonColor: '#d33', // Couleur du bouton d'erreur
              buttonsStyling: false,
              customClass: {
                confirmButton: 'btn btn-danger' // Classe pour le bouton d'erreur
              }
            });
          }
        });
      }
    });
    
  }
}