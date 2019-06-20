import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from './../../api.service';
import { UserService } from '../../services/user.service';
import { Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
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
    getUser() {
      return of(this.user);
    }
  }
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userService: UserService;
  let apiServiceSpy: jasmine.SpyObj<UserService>;
  let user: User;
  let mockUserService: MockUserService;

  beforeEach(async(() => {
    mockUserService = new MockUserService();
    TestBed.configureTestingModule({
       providers: [ 
      UserService,
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ DashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    //userService.getUser.and.returnValue(Observable, of(user));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it(`should have Welcome user`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Welcome Boo Berry');
  });
  it(`should have user categories`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('li').textContent).toContain('Thrills');
  });
  
});
