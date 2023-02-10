import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';

@Injectable({
    providedIn: 'root'
}) 
export class UsersService {
   users: UserLdap[] = LDAP_USERS;
   private usersUrl = '';
   private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

   constructor(private http: HttpClient) { 
    this.usersUrl = environment.usersApiUrl;
   }

   getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
   }

   getUser(id: number): Observable<UserLdap> {
     return this.http.get<UserLdap>(this.usersUrl + '/' + id);
   }

   addUser(user: UserLdap): Observable<UserLdap> {
    this.users.push(user);
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    });
   }

   updateUser(userToUpdate: UserLdap): Observable<UserLdap> {
    const user = this.users.find( u => u.login === userToUpdate.login);
    if (user) {
      user.nom = userToUpdate.nom;
      user.prenom = userToUpdate.prenom;
      user.nomComplet = user.nom + ' ' + user.prenom;
      user.motDePasse = userToUpdate.motDePasse;

      return this.http.put<UserLdap>(this.usersUrl + '/' + user.id,
      user, {headers: this.httpOptions});
    }
    return throwError('Utilisateur non trouvé');
   }

    deleteUser(id: number): Observable<UserLdap> {
      return this.http.delete<UserLdap> (this.usersUrl + '/' + id,  {
        headers: this.httpOptions
      })
    }

    
  
   
 }
