import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { User } from '../models/user';
import { Category } from '../models/category';
import { USERS } from '../mock-users';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  id: any;
  index: number;
  path = environment.path
  authpath = environment.path + '/auth';

  private logoutSource = new Subject<string>();
  logout$ = this.logoutSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) { }

  /*
	Searches users for username/password match.  Returns true and assigns user number if match found, false otherwise.
  */
  login(username: string, password: string): boolean {
    console.log('in login');
    var loginData = { username, password }
    this.loginUser(loginData);
    console.log('after database');
    var i;
    for (i = 0; i < USERS.length; i++) {
      if (USERS[i].username == username && USERS[i].password == password) {
        console.log('in mock loop');
        this.index = i;
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
        console.log(res['userID']);
    });
  }

  //Database call to update user profile
  updateUser(profileData) {
    this.httpClient.post(this.path + '/user/' + this.id + '/update', profileData).subscribe(res => {
      console.log(res);
    });
  }

  /*
	Database call for login
  */
  loginUser(loginData) {
    this.httpClient.post(this.authpath + '/login', loginData).subscribe(res =>{
        console.log(res['token']);
        console.log(res['userID']);
        if (res['token']) {
          this.id = res['userID'];
          console.log('Token exists');
      //    this.isLoggedIn();
          this.router.navigate(['dashboard/' + res['userID']]);
          console.log(loginData.username);
        }
    });
  }

  getUserID() {
    return this.id;
  }

  /*
	Gets user based on number assigned in login
  */
  getMockUser(): Observable<User> {
    console.log(this.id, 'from getUser');
    return of(USERS[this.id]);
  }

   /*
	Gets user based on id instantiated at login
  */
  getUser(): Observable<User> {
    return this.httpClient.get<User>(this.path + '/user/' + this.id);
  }
  
  /*
	Gets user Categories
  */
  getUserCategories(): Observable<Category[]> {
    //return this.httpClient.get<Category[]>(this.path + '/user/' + this.id);
    return of(USERS[this.index].tracked_categories);
  }

  /*
	Registers a new user in the database
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
    this.logoutSource.next();
  }

   /*
	Checks to see if user has token from server (ie is logged in)
  */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }



}
