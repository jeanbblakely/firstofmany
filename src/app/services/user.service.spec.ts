import { TestBed } from '@angular/core/testing';
import { ApiService } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

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
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  
    //it('should return true for successful user login', () => {
    //const service: UserService = TestBed.get(UserService);
    //expect(service.login("user", "password")).toEqual(true);
  //});
});
