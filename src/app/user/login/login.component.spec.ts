import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        RouterTestingModule
      ],
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    location = TestBed.get(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should show message on successful login', () => {
    component.username = 'user';
    component.password = 'password';
    component.login();
    expect(component.message).toEqual('logged in');
  });
  
  it('should show message on unsuccessful login', () => {
    component.username = 'jblakely';
    component.password = 'password';
    component.login();
    expect(component.message).toEqual('not logged in');
  });
});
