import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Category } from './../../models/category';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  message = '';
  categoryForm: FormGroup;

  constructor(private categoryService: CategoryService, private userService: UserService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.createForm();
  }
  
  /*
	Creates categoryForm based on input
  */
  private createForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }
  
  /*
	Adds new Category; copies to User
  */
  addCategory(): void {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.get('name').value);
      if (!this.searchCategory(this.categoryForm.get('name').value)) {
        console.log('no match');
        this.executeCategoryCreation();
        //todo updateUser with Category in UserService 
      } else {
        var currentCategory = this.searchCategory(this.categoryForm.get('name').value);
        console.log(currentCategory, 'current category');
        var currentUser = this.userService.getUser();
        console.log(currentUser, 'current user');
        //todo updateUser with Category in UserService
      }
    } else {
      this.message = 'the form has errors';
    }
    
  }
  
  /*
	Searches and returns existing Category
  */
  searchCategory(name: string): Observable<Category> {
    return this.categoryService.searchCategories(name);
  }
  
  private executeCategoryCreation(): void {
    let category: Category = {
      name: this.categoryForm.get('name').value,
      experiences: []
    }
    this.categoryService.createCategory(category)
      .subscribe(res => {
        console.log('successfully created');
       },
       (error => {
          this.message = 'error creating experience'; 
       }))
  }

}
