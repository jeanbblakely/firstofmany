import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Category } from './../../models/category';
import { User } from './../../models/user';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  selectedCategoryName: string;
  message = '';
  categoryForm: FormGroup;
  currentCategory: Category;
  currentUserCategory: Category;
  categories: Category[];
  user: User;

  constructor(private categoryService: CategoryService, private userService: UserService, private fb: FormBuilder,
    private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    this.getCategories();
    this.createForm();
    this._route.queryParams.subscribe(params => { this.selectedCategoryName = params['name']; });
    this.categoryForm.controls['name'].setValue(this.selectedCategoryName, { onlySelf: true });
  }

  /*
	Creates categoryForm based on input
  */
  private createForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]],
      experiences: this.fb.array([])
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
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
      });
  }

  /*
	Adds new Category
  */
  addCategory(): void {
    if (this.categoryForm.valid) {
      let name = this.capitalize(this.categoryForm.get('name').value);
      let newCategory = new Category(name, []);
      let foundCategory = this.searchCategory(name);
      let foundUserCategory = this.searchUserCategory(name);
      if (foundCategory) {
        if (!foundUserCategory) {
          this.userService.addUserCategory(foundCategory);
        }
      } else if (foundUserCategory) {
        this.categoryService.createCategory(foundUserCategory);
      } else {
        this.userService.addUserCategory(newCategory);
        this.categoryService.createCategory(newCategory);
      }
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 500);
    } else {
      this.message = 'the form has errors';
    }
  }

  /*
	Searches and returns existing Category
  */
  searchCategory(name: string): Category {
    var trimName = name.trim();
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name.toUpperCase() === trimName.toUpperCase()) {
        return this.categories[i];
      }
    }
    return null;
  }

  /*
	Searches and returns existing Category
  */
  searchUserCategory(name: string): Category {
    var trimName = name.trim();
    for (let i = 0; i < this.user.tracked_categories.length; i++) {
      if (this.user.tracked_categories[i].name.toUpperCase() === trimName.toUpperCase()) {
        return this.user.tracked_categories[i];
      }
    }
    return null;
  }

  private capitalize(str: string) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}
