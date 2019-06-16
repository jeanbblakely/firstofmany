import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public message: string = '';
  public userForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    birthdate: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required)
  });

  constructor(private userService: UserService, 
    private router: Router) { }

  ngOnInit() {
  }
  
  register() {
    console.log('User Control Value', this.userForm.value);
  }

}
