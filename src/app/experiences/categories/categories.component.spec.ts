import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { Category } from '../../models/category';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
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
    let vegetables = component.mockCategories[1];
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
