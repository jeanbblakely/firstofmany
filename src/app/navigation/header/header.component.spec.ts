import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
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

describe('HeaderComponent', () => {
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
  
  class Page {
    navSpy: jasmine.Spy;
    constructor() {
      const routerSpy = fixture.debugElement.injector.get(Router);
      this.navSpy = routerSpy.navigate as jasmine.Spy;
    }
  }

  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;
  let mockUserService: MockUserService;
  //let userService: UserService;
  //let apiServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    mockUserService = new MockUserService();
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [ 
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    //router = TestBed.get(Router);
    location = TestBed.get(Location);
    fixture = TestBed.createComponent(HeaderComponent);
    //router.initialNavigation;
    component = fixture.componentInstance;
    fixture.detectChanges();
    //const routerSpy = fixture.debugElement.injector.get(Router);
    //var navSpy = this.routerSpy.navigate as jasmine.Spy;
    //router.initialNavigation();

  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
  

});