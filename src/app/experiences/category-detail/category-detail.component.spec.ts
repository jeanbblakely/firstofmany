import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryDetailComponent } from './category-detail.component';
import { ExperiencesComponent } from '../experiences/experiences.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Category } from 'src/app/models/category';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ 
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue:{}}
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        MaterialModule
      ],
      
      declarations: [ CategoryDetailComponent, ExperiencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDetailComponent);
    component = fixture.componentInstance;
    component.category = new Category('mock', []);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
