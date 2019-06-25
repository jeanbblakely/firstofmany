import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username = '';
  public password = '';

  public message: string = '';

  constructor(private userService: UserService,
    private router: Router) { }

  /*
	Tries to log user in and displays message.  If user successfully logs in, routes to user dashboard.
  */
  login() {
    if (this.userService.login(this.username, this.password)) {
      this.message = 'logged in';
      this.router.navigate(['dashboard']);
    } else {
      this.message = 'not logged in';
    }
  }
}
