import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the First of Many';

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    userService.logout$.subscribe(() => {
        this.snackBar.open('You are logged out', 'Okay', {duration: 2000});
      }
    )
  }

  ngOnInit() {
  }

}
