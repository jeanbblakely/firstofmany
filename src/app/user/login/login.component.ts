import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  public username = '';
  public password = '';
  public loginData: FormGroup;

  public message: string = '';

  constructor(private userService: UserService,
    private router: Router, private fb: FormBuilder) {
      this.createForm();
    }

  /*
	Tries to log user in and displays message.  If user successfully logs in, routes to user dashboard.
  */
  login() {
    if (this.loginData.valid) {
      if (this.userService.login(this.loginData.get('username').value, this.loginData.get('password').value)) {
        this.message = 'logged in';
        //this.router.navigate(['dashboard']);
      } else {
        this.message = 'not logged in';
      }
    } else {
      this.message = 'the form has errors';

    }

  }

   /*
	Checks form for errors
  */
  public hasError = (controlName: string, errorName: string) => {
    return this.loginData.controls[controlName].hasError(errorName);
  }

   /*
	Creates loginData based on input
  */
  private createForm() {
    this.loginData = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
