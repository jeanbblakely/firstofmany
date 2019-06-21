import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ApiService } from './../../api.service';
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
  
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let userService: UserService;
  let apiServiceSpy: jasmine.SpyObj<UserService>;
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
});
