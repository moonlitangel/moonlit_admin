import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
  private LoginUrl = 'http://52.175.147.246:3002/api/users/login';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  constructor(private http: Http) { }

  login(id: string, password: string) {
    return this.http.post(this.LoginUrl, JSON.stringify({ id: id, password: password }), { headers: this.headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', user.access_token);
          sessionStorage.setItem('currentAuth', user.auth);
          sessionStorage.setItem('currentStore', user.storeId);
          return user;
        }
      });
  }

  logout() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentAuth');
  }
}