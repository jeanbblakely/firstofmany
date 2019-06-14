import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string = '';
  public password: string = '';

  public message: string = '';
  constructor(private userService: UserService, 
    private router: Router) { }

  login() {
    ;
    if (this.userService.login(this.username, this.password)) {
      console.log('Successfully logged in');
      this.message = 'logged in';
      this.router.navigate(['dashboard']);
    } else {
      this.message = 'not logged in';
    }
  }

}
