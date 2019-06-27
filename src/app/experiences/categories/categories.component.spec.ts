import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { CategoriesComponent } from './categories.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ CategoriesComponent ]
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
    let fruit = component.mockCategories[1];
    expect(fruit.name).toBe('Fruit');
    expect(component.colors.includes(fruit['color'])).toBeTruthy();
  });

  it('should display a mat-card for each category', () => {
    const categoryDe: DebugElement = fixture.debugElement;
    const cardDe = categoryDe.query(By.css('mat-card'));
    const card: HTMLElement = cardDe.nativeElement;
    expect(card.textContent).toContain('Vegetables');
  });
});
