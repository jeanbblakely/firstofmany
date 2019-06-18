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
  public username: string = '';
  public password: string = '';
  public message: string = '';
  public userForm: FormGroup;


  constructor(private userService: UserService,
    private router: Router, private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
  }

    /*
	Creates userForm based on input
  */
  createForm() {
    this.userForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      email: [null, Validators.required],
      name: [null, Validators.required],
      birthdate: [null, Validators.required],
      gender: [null, Validators.required]
    });
  }

  /*
	Registers user in the system. Routes to Login page
  */
  register() {
    console.log('User Control Value', this.userForm.value);
    const result: User = Object.assign({}, this.userForm.value);
    console.log('after copy', result);
    if (this.userService.register(result)) {
      console.log('Successfully registered');
      this.message = 'thanks for registering';
      this.router.navigate(['login']);
    } else {
      this.message = 'error in registering';
    }
  }

}
