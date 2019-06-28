import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { Category } from '../../models/category';
import { CATEGORIES } from '../../mock-categories';
import { Observable, of, throwError, Subject } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('CategoriesComponent', () => {
  class MockCategoryService {
     categories = CATEGORIES;
     getCategories(): Observable<Category[]> {
        return of(this.categories);
     }
  };
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockCategoryService: MockCategoryService;

  beforeEach(async(() => {
    mockCategoryService = new MockCategoryService();
    TestBed.configureTestingModule({
      imports: [MaterialModule],
       providers: [ 
        { provide: CategoryService, useValue: mockCategoryService }
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
