import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }
  
  /*
	Gets Observable User from service
  */
  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }
  
    /*
	Checks to see if User is signed in (ie instantiated user.id)
  */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
