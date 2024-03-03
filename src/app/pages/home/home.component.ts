import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userName: string | null;

  constructor() {

    this.userName = localStorage.getItem('userName');
  }

  ngOnInit(): void {
    // Tout code d'initialisation supplémentaire irait ici
  }
}