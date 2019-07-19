import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User;
  selectedIndex: number = 0;
  selectedCategory: Category;

  constructor(private userService: UserService) {
    this.selectedCategory = new Category('empty', []);
  }

  ngOnInit() {
    this.getUser();
  }

  /**
   * Gets Observable User from service
   */
  getUser() {
    this.userService.getUser().subscribe(data => {
      this.user = data
    });
  }

  /**
   * Checks to see if User is signed in (ie instantiated user.id)
   */
  isLoggedIn(): boolean {
    return this.userService.isAuthenticated();
  }

  /**
   * Listens to the clickedCategory event and switches tabs.
   * @param category The category clicked on
   */
  onClickedCategory(category: Category) {
    this.selectedCategory = category;
    this.selectedIndex = 1;
  }
  /**
   * Moves back one tab
   */
  onBackClicked() {
    this.selectedIndex -= 1;
  }
}
