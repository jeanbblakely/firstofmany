import { TestBed, inject } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './../models/user';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  
  beforeEach(() => { 
    const spy = jasmine.createSpyObj('UserService', ['getValue']);
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [UserService]
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
   
  it('should return true for successful mockuser login', () => {
    //const service: UserService = TestBed.get(UserService);
    expect(userService.login("user", "password")).toEqual(true);
    expect(userService.login("jblakely", "blackcat")).toEqual(true);
    expect(userService.login("fancycat", "pickle")).toEqual(true);
  });
  
  it('should return false for unsuccessful mockuser login', () => {
    //const service: UserService = TestBed.get(UserService);
    expect(userService.login("user", "password1")).toEqual(false);
    expect(userService.login("jblakely", "blackcat1")).toEqual(false);
    expect(userService.login("fancycat", "pickle1")).toEqual(false);
  });
});
