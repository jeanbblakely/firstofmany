import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CategoryDetailComponent } from '../category-detail/category-detail.component';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { User } from './../../models/user';
import { Observable, of } from 'rxjs';


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
  @Input() isDashBoard = false;
  categories: Category[];
  selectedCategory: Category;
  userCategories: Category[];
  user: User;
  colors = [
    '#f24236', // cat-red: #f24236;
    '#f7844f', // cat-orange: #f7844f;
    '#ffcc49', // cat-yellow: #ffcc49;
    '#c3f74f', // cat-green: #c3f74f;
    '#4ff7d8', // cat-sea-green: #4ff7d8;
    '#4f6ef7', // cat-blue: #4f6ef7;
    '#844ff7', // cat-purple: #844ff7;
    '#f74fc2', // cat-pink: #f74fc2;
  ]

  constructor(private categoryService: CategoryService, private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    if (!this.isDashBoard) {
      this.getUserCategoriesDeDup();
      this.getCategories();
      this.getUser();
    } else {
      this.getUserCategories();
    }
  }
  
  /*
	Gets Observable User from service
  */
  getUser() {
    this.userService.getUser().subscribe(data => {
      this.user = data;
    });

  }

  /*
 Gets Observable Categories array from service
 */
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.setCardStyle();
      });
  }


  /**
  *  Gets Observable User Categories array from service
 */
  getUserCategories(): void {
    this.userService.getUserCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.setCardStyle();
      });
  }

  /**
   * Gets the user's categories to compare against
   */
  getUserCategoriesDeDup(): void {
    this.userService.getUserCategories()
      .subscribe(categories => {
        this.userCategories = categories;
      });
  }

  /**
   * Sets the background color of each card to a random from colors. Styles cards in userCategories.
   */
  setCardStyle() {
    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i]['color'] = this.colors[Math.floor(Math.random() * this.colors.length)];
      if (!this.isDashBoard) {
        if (this.userCategories.find(c => c.name == this.categories[i].name)) {
          this.categories[i]['display'] = 'none';
        } else {
          this.categories[i]['flippedState'] = 'initial';
        }
      }
    }
  }

  /**
   * 	Select click method for single Category objects
  */
  selectCategory(category: Category): void {
    if (this.isDashBoard) {
      this.selectedCategory = category;
      this.openDialog();
    } else {
      category['flippedState'] = category['flippedState'] === 'initial' ? 'final' : 'initial';
      if (!this.searchUserCategory(category.name)) {
        this.userService.addUserCategory(category);
        this.user.tracked_categories.push(category);
      }
      
    }
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
    var trimName = name.trim();
    var i;
    for (i = 0; i < this.user.tracked_categories.length; i++) {
      if (this.user.tracked_categories[i].name.toUpperCase() === trimName.toUpperCase()) {
        return of(this.user.tracked_categories[i]);
      }
   }
    return null;
  }
}
