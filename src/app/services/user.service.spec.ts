import { TestBed, inject } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { User } from './../models/user';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  
  beforeEach(() => { 
    const spy = jasmine.createSpyObj('UserService', ['getValue']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        UserService,
        { provide: Router, useClass: class { navigate = jasmine.createSpy("navigate"); } }
      ]
  });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
  });
  
  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
  
    it('#isAuthenticated should return false if there is not a token', () => {
    expect(userService.isAuthenticated()).toBeFalsy();
  });
  
  it('#isAuthenticated should return true if there is a token', () => {
    localStorage.setItem('token', '1234');
    expect(userService.isAuthenticated()).toBeTruthy();
  });
  
   //it('#getUser should return observable user', 
   // (done: DoneFn) => {
    //  userService.getUser().subscribe(user => {
    //    expect(user).toBe('observable value');
    //    done();
    //  });     
   //});
   
  it('#login should return true for successful mockuser login', () => {
    //const service: UserService = TestBed.get(UserService);
    expect(userService.login("user", "password")).toEqual(true);
    expect(userService.login("jblakely", "blackcat")).toEqual(true);
    expect(userService.login("fancycat", "pickle12")).toEqual(true);
  });
  
  it('#login should return false for unsuccessful mockuser login', () => {
    //const service: UserService = TestBed.get(UserService);
    expect(userService.login("user", "password1")).toEqual(false);
    expect(userService.login("jblakely", "blackcat1")).toEqual(false);
    expect(userService.login("fancycat", "pickle1")).toEqual(false);
  });
  
   it('#isLoggedIn should return true if there is a token and user id', () => {
    localStorage.setItem('token', '1234');
    userService.login("user", "password");
    expect(userService.isLoggedIn()).toBeTruthy();
  });
  
  it('#isLoggedIn should return false if there is not a token and user id', () => {
    localStorage.setItem('token', null);
    expect(userService.isLoggedIn()).toBeFalsy();
  });
  
  it('#logout should reset token and user id', () => {
    localStorage.setItem('token', '1234');
    userService.login("user", "password");
    expect(userService.isLoggedIn()).toBeTruthy();
    userService.logout();
    expect(userService.isLoggedIn()).toBeFalsy();
  });
  
  it('#getUser should return defined for logged in mockuser', () => {
    userService.login("user", "password");
    expect(userService.getUser()).toBeTruthy();
  });
  
  
  //it('#register returned observable should match the right data', () => {
    //const mockUser = {
    //  id: "5d045ecaece2003576f60b8e",
    //  username: "user",
    //  password: "password",
    //  email: "user@example.com",
    //  name: "Boo Berry",
    //  birthdate: "1/1/1990",
    //  gender: "female",
    //  tracked_info: []
    //  };
    //userService.sendUserRegistration({ id: "5d045ecaece2003576f60b8e",
    //  username: 'user',
    //  password: "password",
    //  email: "user@example.com",
    //  name: "Boo Berry",
    //  birthdate: "1/1/1990",
    //  gender: "female",
    //  tracked_info: [] })
    //  .subscribe(regData => {
    //    expect(regData.name).toEqual('Boo Berry');
    //  });

    //const req = httpTestingController.expectOne('/register');

    //expect(req.request.method).toEqual('POST');

    //req.flush(mockUser);
    //});
  
});

