import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/utilisateurs'; // Remplacez avec l'URL de votre API

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUserProfile(): Observable<any> {
    const userId = localStorage.getItem('userId'); // Assurez-vous d'avoir stocké l'userId lors de la connexion
    if (!userId) {
      throw new Error('User ID not found');
    }
    return this.http.get(`${this.baseUrl}/${userId}`, this.httpOptions);
  }
  

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

  updateProfile(user: any) {
    // Envoyer la requête pour mettre à jour le profil
    return this.http.put(`${this.baseUrl}/${user.id}`, user);
  }

  deleteProfile(userId: number) {
    // Envoyer la requête pour supprimer le compte
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

  

}
