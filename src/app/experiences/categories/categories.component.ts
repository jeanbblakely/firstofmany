import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { User } from './../../models/user';
import { Observable, of, forkJoin } from 'rxjs';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  animations: [
    trigger('flipCard', [
      state('initial', style({
      })),
      state('final', style({
        transformStyle: 'preserve-3d',
        transform: 'rotateY(180deg)',
        pointerEvents: 'none'
      })),
      transition('initial=>final', animate('500ms'))
    ]),
  ]
})
export class CategoriesComponent implements OnInit {
  // @Input() isDashBoard = false;
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
      // this.setCardStyle(this.userCategories);
    });
  }

  /**
   * Sets the background color of each card to an alternating color. Styles cards in userCategories.
   */
  // setCardStyle(categories: Category[]) {
  //   for (let i = 0; i < categories.length; i++) {
  //     if (!this.isDashBoard) {
  //       categories[i]['flippedState'] = 'initial';
  //     }
  //     categories[i]['color'] = i % 2 == 0 ? 'rgba(79, 195, 247, 0.5)' : 'rgba(253, 216, 53, 0.5)';
  //   }
  // }

  /**
   * 	Select click method for single Category objects
  */
  selectCategory(category: Category): void {
    // if (this.isDashBoard) {
      this.selectedCategory = category;
      this.clickedCategory.emit(category);
    // } else {
    //   category['flippedState'] = category['flippedState'] === 'initial' ? 'final' : 'initial';
    //   if (!this.searchUserCategory(category.name)) {
    //     this.userService.addUserCategory(category);
        // this.user.tracked_categories.push(category);
    //   }
    // }
  }

  /***
   * Opens a dialog showing the category's experiences
   */
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50%';
    dialogConfig.width = '70%';
    dialogConfig.minWidth = 250;
    dialogConfig.minHeight = 300;
    dialogConfig.maxWidth = 500;
    dialogConfig.maxHeight = 500;
    dialogConfig.restoreFocus = true;
    dialogConfig.panelClass = 'experiences-dialog';
    dialogConfig.data = this.selectedCategory;
    this.dialog.open(CategoryDetailComponent, dialogConfig);
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
