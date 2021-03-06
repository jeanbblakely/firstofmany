import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '../../services/user.service';
import { CategoriesComponent } from '../../experiences/categories/categories.component';
import { CategoryDetailComponent } from '../../experiences/category-detail/category-detail.component';
import { MaterialModule } from '../../material/material.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Category } from '../../models/category';
import { Observable, of } from 'rxjs';
import { User } from '../../models/user';
import { AngularFittextModule } from 'angular-fittext';
import { SpacebreakPipe } from '../../_pipes/spacebreak.pipe';

import { DashboardComponent } from './dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExperiencesComponent } from 'src/app/experiences/experiences/experiences.component';

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
    getUser() {
      return of(this.user);
    }

    isLoggedIn() {
      return true;
    }
    
    isAuthenticated() {
      return true;
    }
    
    getUserCategories(): Observable<Category[]> {
      return of(this.user.tracked_categories);
    }
  }
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let userService: UserService;
  let user: User;
  let mockUserService: MockUserService;

  beforeEach(async(() => {
    mockUserService = new MockUserService();
    TestBed.configureTestingModule({
       providers: [
      UserService,
        { provide: UserService, useValue: mockUserService }
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MaterialModule,
        AngularFittextModule
      ],
      declarations: [ 
        DashboardComponent, 
        CategoriesComponent, 
        CategoryDetailComponent, 
        SpacebreakPipe,
        ExperiencesComponent
      ]
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

  it(`should have Welcome user with mock service`, () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Welcome Boo Berry');
  });
});
