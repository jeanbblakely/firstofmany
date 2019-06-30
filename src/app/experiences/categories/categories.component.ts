import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../models/category';
import { CATEGORIES } from '../../mock-categories';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  @Input() isDashBoard = false;
  categories: Category[];
  selectedCategory: Category;
  mockCategories = [
    {name: 'Vegetables'},
    {name: 'Fruit'},
    {name: 'Countries'},
    {name: 'Movies'},
    {name: 'Thrills'},
    {name: 'Cuisines'}
  ];
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

  constructor(private categoryService: CategoryService, private userService: UserService) { }

  ngOnInit() {
    console.log(this.isDashBoard, 'isDashBoard');
    if (!this.isDashBoard) {
      this.getCategories();
    } else {
      this.getUserCategories();
    }
    this.getRandomColors();

  }

   /*
	Gets Observable Categories array from service
  */
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

   /*
	Gets Observable User Categories array from service
  */
  getUserCategories(): void {
    this.userService.getUserCategories()
      .subscribe(categories => this.categories = categories);
  }

  getRandomColors() {
    for (let i = 0; i < this.categories.length; i++) {
      this.categories[i]['color'] = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }

  /*
	Select click method for singl Category objects
  */
  onSelect(category: Category): void {
    this.selectedCategory = category;
  }
}
