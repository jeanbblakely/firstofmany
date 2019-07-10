import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { EqualValidatorDirective } from './../../_directives/equal-validator.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message = '';
  userForm: FormGroup;
  genders = ['--', 'Female', 'Male', 'Non-binary/third gender', 'Prefer not to say'];
  minDate = new Date(1900,0,1);
  maxDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  hide = true;

  constructor(private userService: UserService, private fb: FormBuilder,
    private router: Router) {
    }

  ngOnInit() {
    this.createForm();
  }

  /*
	Creates userForm based on input
  */
  private createForm() {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      birthdate: [new Date(), [Validators.required]],
      gender: [this.genders[0], [Validators.required, Validators.pattern('((?!--).)*')]],
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }

  // Great guide at https://code-maze.com/angular-material-form-validation/ which we may want to follow
  // public createUser = (userFormValue) => {
  //   if (this.userForm.valid) {
  //     this.executeUserCreation(userFormValue);
  //   }
  // }

  // private executeUserCreation = (userFormValue) => {
  //   let user: NewUser = {
  //     username: userFormValue.username,
  //     password: userFormValue.password,
  //     name: userFormValue.name,
  //     email: userFormValue.email,
  //     birthdate: userFormValue.birthdate,
  //     gender: userFormValue.gender
  //   }
  //   this.userService.register(user)
  //     .subscribe(res => {
  //       this.message = 'thanks for registering';
  //       this.router.navigate(['login']);
  //     },
  //     (error => {
  //       this.message = 'error in registering';
  //     }))
  // }

  /*
	Registers user in the system. Routes to Login page
  */
  register() {
    if (this.userForm.valid) {
      const result: User = Object.assign({}, this.userForm.value);
  //    console.log('after copy', result);
      if (this.userService.register(result)) {
        console.log('Successfully registered');
        this.message = 'thanks for registering';
        this.router.navigate(['login']);
      } else {
        this.message = 'error in registering';
      }
    } else {
      this.message = 'your form has errors';
    }

  }

}
