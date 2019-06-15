import { Injectable } from '@angular/core';
import { Observable, of as ObservableOf, throwError } from 'rxjs';
import { User } from '../models/user';
import { USERS } from '../mock-users';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  index: number;

  constructor() { }
  
  login(username: string, password: string): boolean {
    var i;
    console.log(USERS.length);
    for (i = 0; i < USERS.length; i++) {
      console.log(USERS[i].password);
      console.log(USERS[i].username);
      if (USERS[i].username == username && USERS[i].password == password) {
        this.index = i;
        console.log(this.index);
        return true;
      }
    
   }
   return false;
  }
  
  getUser(): User {
    return USERS[this.index];
  }

}
