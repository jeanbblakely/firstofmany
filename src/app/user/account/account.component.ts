import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from './../../models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public message: string = '';
  public userForm: FormGroup;
  genders = ['--', 'Female', 'Male', 'Non-binary/third gender', 'Prefer not to say'];
  minDate = new Date(1900,0,1);
  maxDate = new Date(Date.now() + 24 * 60 * 60 * 1000);
  user: User;


  constructor(private userService: UserService,
    private router: Router, private fb: FormBuilder) {
      //this.createForm();
      
    }

  ngOnInit() {
    this.getUser();
    //this.userForm = this.fb.group(this.user);
    this.updateForm();
  }
  
   /*
	Gets Observable User from service
  */
  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }
  
  /*
	Checks form for errors
  */
  hasError = (controlName: string, errorName: string) => {
    return this.userForm.controls[controlName].hasError(errorName);
  }
  
    /*
	Checks to see if User is signed in (ie instantiated user.id)
  */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

    /*
	Creates userForm based on input
  */
  updateForm() {
    this.userForm = this.fb.group({
      username: [this.user.username, [Validators.required]],
      password: [this.user.password, [Validators.required, Validators.minLength(8)]],
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]],
      birthdate: [this.user.birthdate, [Validators.required]],
      gender: [this.user.gender, [Validators.required, Validators.pattern('((?!--).)*')]],
    });
  }
  
   /*
	Updates user based on input
  */
  update() {
    if (this.userForm.valid) {
      const result: User = Object.assign({}, this.userForm.value);
      console.log('after copy', result);
      //todo write update method in userservice
      this.message = 'successfully updated';
      this.router.navigate(['dashboard']);
    } else {
      this.message = 'your form has errors';
    }
  }

}
