import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username = '';
  public password = '';

  public message: string = '';

  loginData = {};

  constructor(private userService: UserService,
    private router: Router, private apiService: ApiService) { }

  /*
	Tries to log user in and displays message.  If user successfully logs in, routes to user dashboard.
  */
  login() {
    if (this.userService.login(this.username, this.password)) {
      console.log('Successfully logged in');
      this.message = 'logged in';
      this.router.navigate(['dashboard']);
    } else {
      this.message = 'not logged in';
    }
  }

  Post() {
    this.apiService.loginUser(this.loginData);
  }

}
