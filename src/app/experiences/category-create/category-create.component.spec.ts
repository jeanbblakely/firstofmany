import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryCreateComponent } from './category-create.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Category } from '../../models/category';
import { CATEGORIES } from '../../mock-categories';
import { USERS } from '../../mock-users';
import { Observable, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';

describe('CategoryCreateComponent', () => {
  class MockCategoryService {
     categories = CATEGORIES;
     getCategories(): Observable<Category[]> {
        return of(this.categories);
     }
  };
  
  class MockUserService {
     user = USERS[0];
     getUserCategories(): Observable<Category[]> {
        return of(this.user.tracked_categories);
     }
     
     getUser(): Observable<User> {
        return of(this.user);
     }
  };
  
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;
  let mockCategoryService: MockCategoryService;
  let mockUserService: MockUserService;

  beforeEach(async(() => {
    mockCategoryService = new MockCategoryService();
    mockUserService = new MockUserService();
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: UserService, useValue: mockUserService },
        { provide: RouterTestingModule, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ],
      declarations: [ CategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('#searchCategory should be truthy on match from mock independent of case and whitespace', () => {
    expect(component.searchCategory('vegetables')).toBeTruthy();
    expect(component.searchCategory('THRILLS')).toBeTruthy();
    expect(component.searchCategory('TrAvEl')).toBeTruthy();
    expect(component.searchCategory('TrAvEl ')).toBeTruthy();
    expect(component.searchCategory('  vegetables ')).toBeTruthy();
    expect(component.searchCategory(' THRILLS      ')).toBeTruthy();
  });
});
