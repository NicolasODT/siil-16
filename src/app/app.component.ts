import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'siil';
  showNavbar: boolean = true;

  constructor(private router: Router) {
    // Écoute les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Mettre à jour l'état de showNavbar en fonction de la route actuelle
        this.showNavbar = !event.url.includes('login');
      }
    });
  }
}