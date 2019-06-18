import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';
import { USERS } from '../mock-users';
import { ApiService } from '../api.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  id: number;

  constructor(private apiService: ApiService) { }
  
  /*
	Searches users for username/password match.  Returns true and assigns user number if match found, false otherwise.  
  */
  login(username: string, password: string): boolean {
    var i;
    console.log(USERS.length);
    for (i = 0; i < USERS.length; i++) {
      console.log(USERS[i].password);
      console.log(USERS[i].username);
      if (USERS[i].username == username && USERS[i].password == password) {
        this.id = i;
        console.log(this.id);
        return true;
      } 
   }
   return false;
  }
  
  /*
	Gets user based on number assigned in login
  */
  getUser(): Observable<User> {
    return of(USERS[this.id]);
  }
  
  /*
	Registers a new user
  */
  register(user: User): boolean {
    console.log('user in service', user);
    this.apiService.sendUserRegistraion(user);
    return true;
  }


}
