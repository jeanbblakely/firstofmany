import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ApiService } from './../../api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  class MockUserService {
    user: User = {
      id: "5d045ecaece2003576f60b8e",
      username: "user",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1/1/1990",
      gender: "female",
      tracked_info: [
        { 
        name: "Thrills",
        experiences: [
          { 
            name: "Sky Diving",
            note: "So fun",
            img: "img.jpg",
            datestamp: "1/1/2019",
            favorite: false
          },
          {
            name: "Bungee Jumping",
            note: "Disappointing",
            img: "img.jpg",
            datestamp: "1/10/2019",
            favorite: false
      
          }
         ]
        },
        { 
        name: "Vegetables",
          experiences: [
            {
              name: "Eggplant",
              note: "Yucky",
              img: "img.jpg",
              datestamp: "3/8/2019",
              favorite: false
            },
            {
              name: "Red Pepper",
              note: "Yummy",
              img: "img.jpg",
              datestamp: "1/18/2019",
              favorite: true
      
            }
          ]  
        }
      ]
    };
    
  login(username: string, password: string): boolean {
     return username == this.user.username && password == this.user.password;
  }
    
    getUser() {
      return of(this.user);
    }
    
    register() {
      return true;
    }
  }
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    var mockUserService = new MockUserService();
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        BrowserAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MaterialModule
      ],
      providers: [ 
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        UserService,
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
   it('form should be invalid when empty', () => {
    expect(component.userForm.valid).toBeFalsy();
  });
  
   it('error message should show when invalid form is submitted', () => {
    component.register();
    expect(component.message).toEqual('your form has errors');
  });
  
  it('success message should show when valid form is submitted', () => {
    component.userForm.controls['username'].setValue('jblakely');
    component.userForm.controls['password'].setValue('password');
    component.userForm.controls['email'].setValue('jblakely@highlands.edu');
    component.userForm.controls['name'].setValue('jeannie blakely');
    component.userForm.controls['birthdate'].setValue(new Date('4/28/69'));
    component.userForm.controls['gender'].setValue('Female');
    component.register();
    expect(component.message).toEqual('thanks for registering');
  });
  
  it('username field validity', () => {
    let errors = {};
    let username = component.userForm.controls['username'];
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('password field validity', () => {
    let errors = {};
    let password = component.userForm.controls['password'];
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('email field validity', () => {
    let errors = {};
    let email = component.userForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('name field validity', () => {
    let errors = {};
    let name = component.userForm.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  xit('birthdate field validity', () => {
    let errors = {};
    let birthdate = component.userForm.controls['birthdate'];
    errors = birthdate.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('gender field validity', () => {
    let errors = {};
    let gender = component.userForm.controls['gender'];
    errors = gender.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
});
