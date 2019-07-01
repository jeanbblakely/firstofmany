import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from '../../material/material.module';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatListModule } from '@angular/material';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CategoryDetailComponent } from './category-detail.component';
import { Category } from '../../models/category';

describe('CategoryDetailComponent', () => {
  let component: CategoryDetailComponent;
  let fixture: ComponentFixture<CategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        MatCardModule,
        MatDialogModule,
        MatListModule
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
