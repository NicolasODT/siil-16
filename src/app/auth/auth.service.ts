import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'; // Assurez-vous que l'importation est correcte

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/utilisateurs';
  private authUrl = `${this.baseUrl}/authenticate`;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.authUrl, { username, password }, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }).pipe(
      map(response => {
        // Vérifiez que la réponse contient le token
        if (response && response.jwtToken) {
          // Stockez l'utilisateur dans le localStorage
          localStorage.setItem('currentUser', JSON.stringify({ jwtToken: response.jwtToken }));
          this.currentUserSubject.next({ jwtToken: response.jwtToken });
        }
        return response;
      })
    );
  }

  logout(): void {
    // Supprimez l'utilisateur du localStorage lors de la déconnexion
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user, this.httpOptions);
  }

  updateProfile(user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${user.id}`, user, this.httpOptions);
  }

  deleteProfile(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`, this.httpOptions);
  }

  isLoggedIn(): boolean {
    const currentUser = this.currentUserValue;
    return !!currentUser && !!currentUser.jwtToken;
  }


  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`, this.httpOptions);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user, this.httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getUserProfile(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  
decodeToken(token: string): any {
  try {
    return jwtDecode(token);
  } catch (Error) {
    console.error("Erreur lors du décodage du token JWT:", Error);
    return null;
  }
}



isAdmin(): boolean {
  const currentUser = this.currentUserValue;
  if (!currentUser || !currentUser.jwtToken) {
    return false;
  }
  const decodedToken = this.decodeToken(currentUser.jwtToken);
  // Vérifiez que votre token contient bien une propriété définissant le rôle
  return decodedToken && decodedToken.role === 'Admin';
}
}


