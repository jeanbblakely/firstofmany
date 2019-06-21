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
  user: User;


  constructor(private userService: UserService,
    private router: Router, private fb: FormBuilder) {
      this.createForm();
    }

  ngOnInit() {
    this.getUser();
  }
  
   /*
	Gets Observable User from service
  */
  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
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
  createForm() {
    this.userForm = this.fb.group({
      username: 'jblakely',
      password: [null, Validators.required],
      email: [null, Validators.required],
      name: [null, Validators.required],
      birthdate: [null, Validators.required],
      gender: [null, Validators.required]
    });
  }

}
