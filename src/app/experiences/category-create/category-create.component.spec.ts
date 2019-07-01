import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryCreateComponent } from './category-create.component';

describe('CategoryCreateComponent', () => {
  let component: CategoryCreateComponent;
  let fixture: ComponentFixture<CategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        MatIconModule,
        MatCardModule,
        MaterialModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
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
});
