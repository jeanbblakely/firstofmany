import { Component } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private userService: UserService) { }

  /*
	Checks to see if User is signed in (ie instantiated user.id)
  */
  isLoggedIn(): boolean {
    return this.userService.isAuthenticated();
  }

  /*
  Logs user out, routes to homepage
  */
  logout(): void {
    this.userService.logout();
  }
}
