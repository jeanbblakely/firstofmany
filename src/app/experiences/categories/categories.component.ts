import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { User } from './../../models/user';
import { Observable, of, forkJoin } from 'rxjs';
import { AddCategoriesComponent } from '../add-categories/add-categories.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Output() clickedCategory = new EventEmitter<Category>();
  newCategories: Category[];
  selectedCategory: Category;
  userCategories: Category[];
  user: User;

  constructor(private categoryService: CategoryService, private userService: UserService, private dialog: MatDialog) { }

  /**
   * Gets the user, userCategories, and categories at the same time. Then styles each.
   * */
  ngOnInit() {
    forkJoin(
      this.userService.getUser(),
      this.categoryService.getCategories(),
    ).subscribe(([user, allCategories]) => {
      this.user = user;
      this.userCategories = this.user.tracked_categories;
      for (let i = 0; i < this.userCategories.length; i++) {
        let category = this.userCategories[i];
        category['color'] = i % 2 == 0 ? 'rgba(79, 195, 247, 0.5)' : 'rgba(253, 216, 53, 0.5)';
        allCategories = allCategories.filter(c => c.name != category.name);
      }
      this.newCategories = allCategories;
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
   * Opens a dialog showing the category's experiences
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCategoriesComponent, {
      width: '70%',
      minWidth: 250,
      maxWidth: 500,
      autoFocus: true,
      restoreFocus: true,
      disableClose: false,
      panelClass: 'add-categories-dialog',
      data: this.newCategories
    });
  }

  /*
	Searches and returns existing Category
  */
  searchUserCategory(name: string): Observable<Category> {
    let trimName = name.trim();
    for (let i = 0; i < this.userCategories.length; i++) {
      if (this.userCategories[i].name.toUpperCase() === trimName.toUpperCase()) {
        return of(this.userCategories[i]);
      }
    }
    return null;
  }
}
