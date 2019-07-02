import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Category } from './../../models/category';
import { User } from './../../models/user';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css']
})
export class CategoryCreateComponent implements OnInit {
  message = '';
  categoryForm: FormGroup;
  currentCategory: Category;
  categories: Category[];
  user: User;
  favorite = ['false', 'true'];

  constructor(private categoryService: CategoryService, private userService: UserService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.getUser();
    this.getCategories();
    this.createForm();
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
  
  private get experiences(): FormArray {
    return this.categoryForm.get('experiences') as FormArray;
  }
  
  private addExperience() {
    this.experiences.push(this.fb.group({
      name: ['', [Validators.required]],
      note: [null],
      img: [null],
      datestamp: [null],
      favorite: ['false']
    }))
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

  
  public hasError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }
  
  /*
	Adds new Category
  */
  addCategory(): void {
    if (this.categoryForm.valid) {
      console.log(this.categoryForm.get('name').value);
      if (!this.searchCategory(this.categoryForm.get('name').value)) {
        console.log('no match');
        this.currentCategory = Object.assign({}, this.categoryForm.value);
        console.log(this.currentCategory);
        this.executeCategoryCreation();
        console.log('create complete');
        //todo on successful save in Category table updateUser with Category in UserService 
      } else {
        console.log('match');
        var currentCategory = this.searchCategory(this.categoryForm.get('name').value);
        console.log(currentCategory, 'current category');
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
    var i;
    for (i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name.toUpperCase() === name.toUpperCase()) {
        return of(this.categories[i]);
      }
   }
    return null;
  }
  
  private executeCategoryCreation(): void {
    this.categoryService.createCategory(this.currentCategory)
      .subscribe(res => {
        console.log('successfully created');
       },
       (error => {
          this.message = 'error creating experience'; 
       }))
  }

}
