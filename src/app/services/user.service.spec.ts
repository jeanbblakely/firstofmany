import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  
    it('should return true for successful user login', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.login("user", "password")).toEqual(true);
  });
});
