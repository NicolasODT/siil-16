import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router'; 

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
  
  onDelete(user: any) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.authService.deleteUser(user.id).subscribe(() => { // Utilisez deleteUser() de AuthService
        // Mettez à jour la liste des utilisateurs ou affichez un message
        this.loadUsers();
      });
    }
  }
}
