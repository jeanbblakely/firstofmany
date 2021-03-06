import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material';
import { User } from './../../models/user';
import { forkJoin, Subscription } from 'rxjs';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @Output() clickedCategory = new EventEmitter<Category>();
  newCategories: Category[];
  selectedCategory: Category;
  userCategories: Category[];
  userCategoryNames: string[] = [];
  user: User;
  routeQueryParams$: Subscription;

  constructor(
    private categoryService: CategoryService, 
    private userService: UserService, 
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router) { 
      this.routeQueryParams$ = this.route.queryParams.subscribe(params => {
        if (params['categories']) {
          this.openDialog();
        }
        if (!params['categories']) {
          this.dialog.closeAll();
        }
      });
    }

  ngOnInit() {
    this.getCategories();
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }

  /**
    * Gets the user, userCategories, and categories at the same time. Then styles each.
    */
  getCategories() {
    forkJoin(
      this.userService.getUser(),
      this.categoryService.getCategories(),
    ).subscribe(([user, allCategories]) => {
      this.user = user;
      this.userCategories = this.user.tracked_categories;
      for (let i = 0; i < this.userCategories.length; i++) {
        let category = this.userCategories[i];
        this.userCategoryNames.push(category.name);
        category['color'] = i % 2 == 0 ? 'rgba(79, 195, 247, 0.5)' : 'rgba(253, 216, 53, 0.5)';
        allCategories = allCategories.filter(c => c.name != category.name);
      }
      this.newCategories = allCategories;
      this.userCategoryNames.sort();
    });
  }

  /**
   * 	Select click method for single Category objects
   */
  selectCategory(category: Category): void {
    this.selectedCategory = category;
    this.clickedCategory.emit(category);
  }

  /***
   * Opens a dialog showing all the category
   * After closing, passes selected categories to addCategory
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoriesComponent, {
      width: '70%',
      minWidth: 250,
      maxWidth: 500,
      autoFocus: true,
      restoreFocus: true,
      disableClose: false,
      closeOnNavigation: true,
      panelClass: 'add-categories-dialog',
      data: this.newCategories
    }).afterClosed().subscribe(data => {
      if (data != undefined) {
        if (data.length < 5 || confirm("That's a lot of categories at once!\nAre you sure you want to add all " + data.length + " of them?")) {
          data.forEach((c: Category) => this.addCategory(c));
        }
      }
      setTimeout(() => {
        this.getCategories();
      }, 500);
      this.router.navigate(['.'], { relativeTo: this.route });
    });
  }

  /**
   * Adds a category to the user, if it isn't there already.
   * @param category Category to add to the user
   */
  addCategory(category: Category) {
    if (this.userCategoryNames.includes(category.name)) {
      console.error("Sorry. Can't add " + category.name);
    } else {
      this.userService.addUserCategory(category);
      // console.log('Adding ' + category.name + ' to the user!');
    }
  }
}
