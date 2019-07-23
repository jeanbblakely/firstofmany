import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MaterialModule } from './../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { of } from 'rxjs';
import { User } from '../../models/user';
import { DashboardComponent } from 'src/app/user/dashboard/dashboard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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
      security_question: "Who are you?",
      security_answer: "me",
      new_user: true,
      tracked_categories: [
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

    isAuthenticated() {
      return true;
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
    // const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule.withRoutes(
          [{path: 'dashboard', component: DashboardComponent }]
        ),
        BrowserAnimationsModule,
        MaterialModule
      ],
      providers: [
        { provide: RouterTestingModule, useClass: class { navigate = jasmine.createSpy("navigate"); } },
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [HeaderComponent, DashboardComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
