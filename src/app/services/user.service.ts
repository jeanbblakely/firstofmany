import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { User } from '../models/user';
import { Category } from '../models/category';
import { USERS } from '../mock-users';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { Experience } from '../models/experience';
import { MatSnackBar } from '@angular/material';


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
  public tourStartSource = new Subject<boolean>();
  tourStart$ = this.tourStartSource.asObservable();

  constructor(private httpClient: HttpClient, private router: Router,
    private snackBar: MatSnackBar) { }

  TOKEN_KEY = 'token';
  /*
	Searches users for username/password match.  Returns true and assigns user number if match found, false otherwise.
  */
  login(username: string, password: string): boolean {
    var loginData = { username, password }
    this.loginUser(loginData);
    for (let i = 0; i < USERS.length; i++) {
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
  sendUserRegistration(regData: User) {
    this.httpClient.post<any>(this.authpath + '/register', regData).subscribe(res => {
      localStorage.setItem(this.TOKEN_KEY, res.token);
      localStorage.setItem('userID', res.userID);
      // console.log(res);
      let message = res['userID'];
      this.snackBar.open('userID ' + message + ' added', 'Okay', {duration: 3000});
      if (this.isAuthenticated()) {
        this.router.navigate(['/dashboard' + localStorage.getItem('userID')]);
        this.tourStartSource.next(true);
      }
    });

  }

  //Database call to update user profile
  updateUser(profileData: User) {
    this.httpClient.post(this.path + '/user/' + localStorage.getItem('userID') + '/update', profileData).subscribe(res => {
      // console.log(res);
    });
  }

  /*
	Database call for login
  */
  loginUser(loginData) {
    return this.httpClient.post<any>(this.authpath + '/login', loginData).subscribe(res => {
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
    // console.log(this.id, 'from getUser');
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

  addUserCategory(categoryData: Category) {
    this.httpClient.post<any>(this.path + '/addusercategory/' + localStorage.getItem('userID'), categoryData).subscribe(res => {
      let message = res['name'];
      this.snackBar.open(message + ' added', 'Okay', {duration: 3000});
    });
  }

  deleteUserCategory(categoryData: Category) {
    this.httpClient.post<any>(this.path + '/deleteusercategory/' + localStorage.getItem('userID'), categoryData).subscribe(res => {
      let message = res['name'];
      this.snackBar.open(message + ' deleted', 'Okay', {duration: 3000});
    });
  }

  addUserExperience(category: string, experienceData: Experience) {
    return this.httpClient.post<any>(this.path + '/adduserexperience/' + localStorage.getItem('userID') + '/' + category, experienceData);
    // .subscribe(res => {
    //   console.log(res);
    // });
  }

  deleteUserExperience(category: string, experienceData: Experience) {
    return this.httpClient.post<any>(this.path + '/deleteuserexperience/' + localStorage.getItem('userID') + '/' + category, experienceData);
    //   .subscribe(res => {
    //   console.log(res);
    // });
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

  getSecurityQuestion(username): Observable<any> {
   return this.httpClient.get<any>(this.authpath + '/getsecurityquestion/' + username);
  }

  resetPassword(userData: any) {
    this.httpClient.post<any>(this.authpath + '/resetpassword', userData).subscribe(res => {
        let message = res['message'];
        this.snackBar.open(message, 'Okay', {duration: 3000});
    });
  }

}
