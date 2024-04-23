import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = []; // Remplacez any par le type de votre utilisateur

  constructor(private authService: AuthService, private router: Router) {} // Ajoutez Router ici

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.authService.getAllUsers().subscribe(users => { 
      this.users = users;
    });
  }

  onEdit(user: any) {
    this.router.navigate(['/admin/user-edit', user.id]); // Utilisez router ici
  }
  
  onDelete(user: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Cette action est irréversible!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annulez!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.authService.deleteUser(user.id).subscribe({
          next: () => {
            Swal.fire(
              'Supprimé!',
              'L’utilisateur a été supprimé avec succès.',
              'success'
            );
            // Recharge la liste des utilisateurs après la suppression
            this.loadUsers();
          },
          error: (err) => {
            // Affiche une alerte d'erreur si la suppression échoue
            Swal.fire(
              'Erreur!',
              'Une erreur est survenue lors de la suppression. Veuillez réessayer.',
              'error'
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'L’utilisateur est en sécurité :)',
          'error'
        );
      }
    });
  }
}  