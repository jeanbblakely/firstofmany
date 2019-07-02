import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private userService: UserService) {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

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
