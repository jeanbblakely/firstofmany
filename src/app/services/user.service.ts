import { Injectable } from '@angular/core';
import { Observable, of as ObservableOf, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  
  login(username: string, password: string): boolean {
    console.log('Inside the UserService');
    return username == 'user' && password == 'password';
  }
  
  
}
