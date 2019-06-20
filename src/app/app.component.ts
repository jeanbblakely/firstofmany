import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the First of Many';

  constructor(private apiService: ApiService, private userService: UserService) {}

  ngOnInit() {
    this.apiService.getMessage();
  }
  
     /*
	Checks to see if User is signed in (ie instantiated user.id)
  */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
}
