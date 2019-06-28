import { Component, OnInit } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
  }

  /*
	Gets Observable User from service
  */
  getUser() {
    let id = this.route.snapshot.params.id;
    this.userService.getUser(id).subscribe(data => {
      this.user = data
      console.log(this.user)
    });
  }

    /*
	Checks to see if User is signed in (ie instantiated user.id)
  */
  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

}
