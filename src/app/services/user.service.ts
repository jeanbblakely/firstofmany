import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { USERS } from '../mock-users';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  id: any;

  constructor(private apiService: ApiService) { }
  
  /*
	Searches users for username/password match.  Returns true and assigns user number if match found, false otherwise.  
  */
  login(username: string, password: string): boolean {
    var loginData = { username, password } 
    this.apiService.loginUser(loginData);
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
	Gets user based on number assigned in login
  */
  getUser(): Observable<User> {
    console.log(this.id, 'from getUser');
    return of(USERS[this.id]);
  }
  
  /*
	Registers a new user in db
  */
  register(user: User): boolean {
    this.apiService.sendUserRegistration(user);
    return true;
  }
  
  /*
	Checks to see if user is logged in (ie has id)
  */
  isLoggedIn(): boolean {
    console.log("hello from service");
    console.log(this.id);
    if (typeof this.id != 'undefined') {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
      
    }
  }
  
  


}
