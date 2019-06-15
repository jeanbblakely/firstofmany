import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username = '';
  public password = '';

  public message = '';
  constructor(private router: Router) { }

  login() {
    if (this.username === 'user' && this.password === 'password') {
      console.log('Successfully logged in');
      this.message = 'logged in';
      this.router.navigate(['dashboard']);
    } else {
      this.message = 'not logged in';
    }
  }

}
