import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(): boolean  {
    console.log('AuthGuard#canActivate called');
    if (this.userService.isLoggedIn()) {
      return true;
    }
    console.log('AuthGuard#canActivate not authorized to access page');
    this.router.navigate(['login']);
    return false;
    
  }
  
}
