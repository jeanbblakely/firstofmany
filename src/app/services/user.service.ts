import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { User } from '../models/user';
import { Category } from '../models/category';
import { USERS } from '../mock-users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { retry, catchError } from 'rxjs/operators';


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

  TOKEN_KEY = 'token';
  /*
	Searches users for username/password match.  Returns true and assigns user number if match found, false otherwise.
  */
  login(username: string, password: string): boolean {
    var loginData = { username, password }
    this.loginUser(loginData);
    var i;
    for (i = 0; i < USERS.length; i++) {
      if (USERS[i].username == username && USERS[i].password == password) {
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
    this.httpClient.post<any>(this.authpath + '/register', regData).subscribe(res =>{
        localStorage.setItem(this.TOKEN_KEY, res.token);
        localStorage.setItem('userID', res.userID);
        console.log(res);
    });
    if (this.isAuthenticated()) {
      this.router.navigate(['dashboard/' + localStorage.getItem('userID')]);
    }
  }

  //Database call to update user profile
  updateUser(profileData) {
    console.log(profileData, 'profileData inside update');
    this.httpClient.post(this.path + '/user/' + localStorage.getItem('userID') + '/update', profileData).subscribe(res => {
      console.log(res);
      console.log('after http call');
    });
  }

  /*
	Database call for login
  */
  loginUser(loginData) {
    return this.httpClient.post<any>(this.authpath + '/login', loginData).subscribe(res =>{
        localStorage.setItem('token', res.token);
        if (this.isAuthenticated()) {
          this.id = res['userID'];
          localStorage.setItem('userID', this.id);
      //    this.isLoggedIn();
          this.router.navigate(['dashboard']);
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
    return this.httpClient.get<User>(this.path + '/user/' + localStorage.getItem('userID'));
  }

  /*
	Gets user Categories
  */
  getUserCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.path + '/usercategories/' + localStorage.getItem('userID'));
    //return of(USERS[this.index].tracked_categories);
  }

  addUserCategory(categoryData) {
    this.httpClient.post<any>(this.path + '/addusercategory/' + localStorage.getItem('userID'), categoryData).subscribe(res => {
      console.log(res);
    });
  }

  addUserExperience(category, experienceData) {
    console.log('user service');
    this.httpClient.post<any>(this.path + '/adduserexperience/' + localStorage.getItem('userID') + '/' + category, experienceData).subscribe(res => {
      console.log(res);
    });
  }

  /*
	Registers a new user in the database
  */
  register(user: User) {
     this.sendUserRegistration(user);
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
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    this.logoutSource.next();
  }

   /*
	Checks to see if user has token from server (ie is logged in)
  */
  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
