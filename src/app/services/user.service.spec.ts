import { TestBed } from '@angular/core/testing';
import { ApiService } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let apiService: ApiService;
  
  beforeEach(() => { 
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
  });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  
    it('should return true for successful user login', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.login("user", "password")).toEqual(true);
  });
});
