import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AccountComponent } from './account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user';


describe('AccountComponent', () => {
     class MockUserService {
    user: User = {
      id: "5d045ecaece2003576f60b8e",
      username: "user",
      password: "password",
      email: "user@example.com",
      name: "Boo Berry",
      birthdate: "1990-01-01",
      gender: "Female",
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
    
    updateUser(id: string, data: any): boolean {
       return true; 
    }
  }
  
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let userService: UserService;
  let mockUserService: MockUserService;

  beforeEach(async(() => {
    mockUserService = new MockUserService();
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
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ AccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`should have user named account with mock service`, () => {
    const fixture = TestBed.createComponent(AccountComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain("Boo Berry's Account");
  });
  
  it('form should be valid when submitted with prefilled user info', () => {
    expect(component.userForm.valid).toBeTruthy();
  });
  
  it('error message should show when invalid form is submitted', () => {
    component.userForm.controls['username'].setValue('jblakely');
    component.userForm.controls['password'].setValue('');
    component.userForm.controls['email'].setValue('');
    component.userForm.controls['name'].setValue('');
    component.userForm.controls['birthdate'].setValue('');
    component.userForm.controls['gender'].setValue('');
    component.update();
    expect(component.message).toEqual('your form has errors');
  });
  
  it('success message should show when valid form is submitted', () => {
    component.userForm.controls['password'].setValue('bumblepuppy');
    component.userForm.controls['email'].setValue('bumble@gmail.com');
    component.update();
    expect(component.message).toEqual('successfully updated');
  });
  
    it('username field validity', () => {
    let errors = {};
    component.userForm.controls['username'].setValue('');
    let username = component.userForm.controls['username'];
    errors = username.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
   it('password field validity', () => {
    let errors = {};
    component.userForm.controls['password'].setValue('');
    let password = component.userForm.controls['password'];

    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('password field length validity error', () => {
    let errors = {};
    component.userForm.controls['password'].setValue('abc');
    let password = component.userForm.controls['password'];
    errors = password.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });
  
  it('password field length validity no error', () => {
    let errors = {};
    component.userForm.controls['password'].setValue('abcdefgh');
    let password = component.userForm.controls['password'];
    errors = password.errors || {};
    expect(errors['minlength']).toBeFalsy();
  });
  
   it('email field validity required', () => {
    let errors = {};
    component.userForm.controls['email'].setValue('');
    let email = component.userForm.controls['email'];
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
  it('email field email validity not formatted', () => {
    let errors = {};
    component.userForm.controls['email'].setValue('jblakely#gmail.com');
    let email = component.userForm.controls['email'];
    errors = email.errors || {};
    expect(errors['email']).toBeTruthy();
  });
  
  it('email field email validity formatted', () => {
    let errors = {};
    component.userForm.controls['email'].setValue('jblakely@gmail.com');
    let email = component.userForm.controls['email'];
    errors = email.errors || {};
    expect(errors['email']).toBeFalsy();
  });
  
   it('name field validity', () => {
    let errors = {};
    component.userForm.controls['name'].setValue('');
    let name = component.userForm.controls['name'];
    errors = name.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
   it('birthdate field validity', () => {
    let errors = {};
    component.userForm.controls['birthdate'].setValue('');
    let birthdate = component.userForm.controls['birthdate'];
    errors = birthdate.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
   it('gender field validity', () => {
    let errors = {};
    component.userForm.controls['gender'].setValue('');
    let gender = component.userForm.controls['gender'];
    errors = gender.errors || {};
    expect(errors['required']).toBeTruthy();
  });
  
   it('gender field validity pattern', () => {
    let errors = {};
    component.userForm.controls['gender'].setValue('--');
    let gender = component.userForm.controls['gender'];
    errors = gender.errors || {};
    expect(errors['pattern']).toBeTruthy();
  });
});
