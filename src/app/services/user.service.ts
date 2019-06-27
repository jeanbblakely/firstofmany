import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { USERS } from '../mock-users';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  id: any;
  path = environment.path
  authpath = environment.path + '/auth';

  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
	Searches users for username/password match.  Returns true and assigns user number if match found, false otherwise.
  */
  login(username: string, password: string): boolean {
    var loginData = { username, password }
    this.loginUser(loginData);
    var i;
    for (i = 0; i < USERS.length; i++) {
      if (USERS[i].username == username && USERS[i].password == password) {
        this.id = i;
        return true;
      }
   }
   return false;
  }

  /*
	Database call for registration
  */
  sendUserRegistration(regData) {
    this.httpClient.post(this.authpath + '/register', regData).subscribe(res =>{
        console.log(res);
    });
  }

  //Database call to update user profile
  updateUser(profileData) {
    this.httpClient.post('/user/:id/update', profileData).subscribe(res => {
      console.log(res);
    });
  }

  /*
	Database call for login
  */
  loginUser(loginData) {
    this.httpClient.post(this.authpath + '/login', loginData).subscribe(res =>{
        console.log(res['token']);
        if (res['token']) {
          console.log('Token exists');
          this.router.navigate(['dashboard']);
          console.log(loginData.username);
        }
    });
  }

  /*
	Gets user based on number assigned in login
  */
  getUser(): Observable<User> {
    console.log(this.id, 'from getUser');
    return of(USERS[this.id]);
  }

  /*
	Registers a new user
  */
  register(user: User): boolean {
    this.sendUserRegistration(user);
    return true;
  }

  /*
	Checks to see if user is logged in (ie has id)
  */
  isLoggedIn(): boolean {
    if (typeof this.id != 'undefined' && this.id != null) {
      return true;
    } else {
      return false;
    }
  }

   /*
	Logs user out; resets, sets token to null
  */
  logout(): void {
    this.id = null;
    localStorage.setItem('token', null);
  }

   /*
	Checks to see if user has token from server (ie is logged in)
  */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }



}
