import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Category } from '../../models/category';
import { CATEGORIES } from '../../mock-categories';
import { USERS } from '../../mock-users';
import { Observable, of, throwError, Subject } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

describe('CategoriesComponent', () => {
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
  };
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockCategoryService: MockCategoryService;
  let mockUserService: MockUserService;

  beforeEach(async(() => {
    mockCategoryService = new MockCategoryService();
    mockUserService = new MockUserService();
    TestBed.configureTestingModule({
      imports: [MaterialModule, HttpClientModule],
       providers: [ 
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ CategoriesComponent, CategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get random color for a category', () => {
    let vegetables = component.categories[1];
    expect(vegetables.name).toBe('Vegetables');
    expect(component.colors.includes(vegetables['color'])).toBeTruthy();
  });

  it('should display a mat-card for each category', () => {
    const categoryDe: DebugElement = fixture.debugElement;
    const cardDe = categoryDe.query(By.css('mat-card'));
    const card: HTMLElement = cardDe.nativeElement;
    expect(card.textContent).toContain('Thrills');
  });
});
