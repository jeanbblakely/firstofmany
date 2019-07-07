import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryDetailComponent } from './category-detail.component';
import { Category } from '../../models/category';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ 
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue:{}}
      ],
      imports: [
        MaterialModule,
        RouterTestingModule
      ],
      
      declarations: [ CategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
