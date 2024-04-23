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
      background: '#191919', // fond noir
      color: '#fff', // texte blanc
      confirmButtonColor: '#28a745', // bouton de confirmation vert
      cancelButtonColor: '#d33', // bouton d'annulation rouge
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, annulez!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(user.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Supprimé!',
              text: 'L’utilisateur a été supprimé avec succès.',
              icon: 'success',
              background: '#191919',
              color: '#fff',
              confirmButtonColor: '#0b4f25',
            });
            // Recharge la liste des utilisateurs après la suppression
            this.loadUsers();
          },
          error: (err) => {
            Swal.fire({
              title: 'Erreur!',
              text: 'Une erreur est survenue lors de la suppression. Veuillez réessayer.',
              icon: 'error',
              background: '#191919',
              color: '#fff',
              confirmButtonColor: '#d33',
            });
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Annulé',
          text: 'L’utilisateur est en sécurité :)',
          icon: 'info',
          background: '#191919',
          color: '#fff',
          confirmButtonColor: '#0b4f25',
        });
      }
    });
  }}