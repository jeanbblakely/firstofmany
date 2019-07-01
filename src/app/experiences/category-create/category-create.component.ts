import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
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

  constructor(private categoryService: CategoryService, private fb: FormBuilder,
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
  
  addCategory() {
    console.log(this.categoryForm.get('name').value);
    if (!this.searchCategory(this.categoryForm.get('name').value)) {
      console.log('no match');
      //todo addCategory in CategoryService
      //todo updateUser with Category in UserService 
    } else {
      console.log(this.searchCategory(this.categoryForm.get('name').value));
      //todo updateUser with Category in UserService
    }
  }
  
  searchCategory(name: string): Observable<Category> {
    return this.categoryService.searchCategories(name);
  }

}
