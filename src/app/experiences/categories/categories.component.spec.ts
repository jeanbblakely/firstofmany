import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { CategoriesComponent } from './categories.component';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { Category } from '../../models/category';
import { CATEGORIES } from '../../mock-categories';
import { USERS } from '../../mock-users';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Observable, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { AngularFittextModule } from 'angular-fittext';
import { SpacebreakPipe } from '../../_pipes/spacebreak.pipe';
import { ExperiencesComponent } from '../experiences/experiences.component';


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
     getUser() {
       return of(this.user);
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
      imports: [
        RouterTestingModule,
        MaterialModule, 
        AngularFittextModule,
        HttpClientModule, 
        BrowserAnimationsModule 
       ],
       providers: [ 
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: UserService, useValue: mockUserService }
      ],
      declarations: [ CategoriesComponent, CategoryDetailComponent, SpacebreakPipe, ExperiencesComponent ],
    })
    .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [CategoryDetailComponent] } })
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

  it('should display a mat-card for each category', () => {
    const categoryDe: DebugElement = fixture.debugElement;
    const cardDe = categoryDe.query(By.css('mat-card'));
    const card: HTMLElement = cardDe.nativeElement;
    expect(card.textContent).toContain('Thrills');
  });
  
   it('should call getCategories but not getUserCategories on default if isDashboard is false', () => {
    spyOn(component, 'getCategories');
    component.ngOnInit();
    expect(component.getCategories).toHaveBeenCalled();
    expect(component.getCategories).toHaveBeenCalledTimes(1);
  });
  
  //  xit('should set selectedCategory to Category passed in selectCategory', () => {
  //   let categories = mockCategoryService.getCategories();
  //   component.selectCategory(categories[0]);
  //   expect(component.selectedCategory).toBe(categories[0]);
  // });
});
