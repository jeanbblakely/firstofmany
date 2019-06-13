import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string = '';
  public password: string = '';

  public message: string = '';
  constructor() { }

  login() {
    if (this.username == 'user' && this.password == 'password') {
      console.log('Successfully logged in');
      this.message = 'logged in';
    } else {
      this.message = 'not logged in';
    }
  }

}
