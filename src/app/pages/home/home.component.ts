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
      const decodedToken: any = jwtDecode(JSON.parse(currentUser).jwtToken);  
      this.userName = decodedToken.username;  
    } else {
      this.userName = null;
    }
  }

  ngOnInit(): void {
    // Tout code d'initialisation supplémentaire irait ici
  }
}
