import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface AuthenticationResponse {
  status: boolean;
  token: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  redirectUrl = '/';

  constructor() { }


static isLoggedIn() {
  const token = AuthenticationService.getToken();
  console.log('token=' + token);
  return !! token && !AuthenticationService.isTokenExpired(token);
}

static isTokenExpired(token: string) {
  /*
  try {
    const decoded = jwt_decode(token);
    return decoded.exp < Date.now() /1000;
  } catch (err) {
    return false;
  }
*/
  return false;
}

static setToken(idToken: string) {
  sessionStorage.setItem('id_token', idToken);
}

static getToken() {
  return sessionStorage.getItem('id_token');
}

static logout() {
  sessionStorage.removeItem('id_token');
}

loginWithRole(username, password, role): Observable<AuthenticationResponse> {
  const response: AuthenticationResponse
      = {status: true, message: 'HTTP 200', token: 'atoken'};
  AuthenticationService.setToken('token');
  return of(response);
}
}