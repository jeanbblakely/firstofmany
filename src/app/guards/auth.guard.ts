import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  
  canActivate(): boolean  {
    if (this.userService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
    
  }
  
}
