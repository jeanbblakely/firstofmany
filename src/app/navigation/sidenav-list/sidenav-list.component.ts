import { Component, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  constructor(private userService: UserService) {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  /*
	Checks to see if User is signed in (ie instantiated user.id)
  */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }
  
  /*
	Logs user out, routes to homepage
  */
  logout(): void {
    this.userService.logout();
  }
}
