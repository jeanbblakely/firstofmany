import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Category } from 'src/app/models/category';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  selectedIndex: number = 0;
  selectedCategory: Category;
  routeQueryParams$: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    let sampleCategory = new Category('Sample Fruit', [
      new Experience('Banana', "Yellow and sweet!", new Date().toISOString(), false),
      new Experience('Starfruit', "My favorite weird fruit! Tastes like a sour apple.", new Date().toISOString(), true),
      new Experience('Dragonfruit', "Great name, not great taste", new Date().toISOString(), false),
    ]);
    this.selectedCategory = sampleCategory;
    this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
      if (params['category-details']) {
        this.selectedIndex = 1;
      } else if (params['all-categories']) {
        this.selectedIndex = 0;
      }
    });
  }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
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
    setTimeout(() => {
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() =>
        this.router.navigate(["dashboard"]));
    }, 500);
  }
}
