import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from './../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from './../../api.service';
import { UserService } from '../../services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user';

describe('LoginComponent', () => {
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
  }

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let location: Location;
  let mockUserService: MockUserService;
  //let userService: UserService;
  //let apiServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    mockUserService = new MockUserService();
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } },
      UserService,
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should show message on successful login', () => {
    component.username = 'user';
    component.password = 'password';
    component.login();
    expect(component.message).toEqual('logged in');
  });
  
  it('should show message on unsuccessful login', () => {
    component.username = 'jblakely';
    component.password = 'password';
    component.login();
    expect(component.message).toEqual('not logged in');
  });
});
