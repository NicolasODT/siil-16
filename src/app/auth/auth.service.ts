import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/utilisateurs'; // Remplacez avec l'URL de votre API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

// AuthService
login(username: string, password: string): Observable<any> {
  const url = 'http://localhost:8080/api/utilisateurs/login';
  const body = { email: username, password: password };
  return this.http.post(url, body, this.httpOptions);
}


  logout(): void {
    // Supprimer l'utilisateur du stockage local pour se déconnecter
    localStorage.removeItem('currentUser');
  }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/register`, user);
  }
}
