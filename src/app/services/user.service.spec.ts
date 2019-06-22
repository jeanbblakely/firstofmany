import { TestBed } from '@angular/core/testing';
import { ApiService } from './../api.service';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './../models/user';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let userService: UserService;
  let apiServiceSpy: jasmine.SpyObj<UserService>;
  
  beforeEach(() => { 
    const spy = jasmine.createSpyObj('UserService', ['getValue']);
    TestBed.configureTestingModule({
      //imports: [ HttpClientTestingModule ]
      providers: [
        UserService,
        { provide: UserService, useValue: spy }
      ]
  });
    //httpClient = TestBed.get(HttpClient);
    //httpTestingController = TestBed.get(HttpTestingController);
    userService = TestBed.get(UserService);
    apiServiceSpy = TestBed.get(UserService);
  });
  
  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
  
  xit('#isAuthenticated should return true if there is a token', () => {
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
   
    //it('should return true for successful user login', () => {
    //const service: UserService = TestBed.get(UserService);
    //expect(service.login("user", "password")).toEqual(true);
  //});
});
