import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null;

  constructor() {
    // Assurez-vous que le nom du token dans le localStorage est correct
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const decodedToken: any = jwtDecode(JSON.parse(currentUser).jwtToken);  // Utilisez la clé exacte où se trouve le token JWT
      this.userName = decodedToken.username;  // Ou 'sub' si c'est ce que contient votre token
    } else {
      this.userName = null;
    }
  }

  ngOnInit(): void {
    // Tout code d'initialisation supplémentaire irait ici
  }
}
