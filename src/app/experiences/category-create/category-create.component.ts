import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
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
  favorite = ['false', 'true'];
  disabled = true;
  minDate = new Date(1900,0,1);
  maxDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  constructor(private categoryService: CategoryService, private userService: UserService, private fb: FormBuilder,
    private router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getUser();
    this.getCategories();
    this.createForm();
    this._route.queryParams.subscribe(params => { this.selectedCategoryName = params['name']; });
    this.categoryForm.controls['name'].setValue(this.selectedCategoryName, {onlySelf: true});
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

  public get experiences(): FormArray {
    return this.categoryForm.get('experiences') as FormArray;
  }

  public addExperience() {
    this.experiences.push(this.fb.group({
      name: ['', [Validators.required]],
      note: [null],
      img: [null],
      datestamp: [new Date(), [Validators.required]],
      favorite: [false]
    }));
  }
  
  public removeExperience(index: number) {
    this.experiences.removeAt(index);
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
      if (!this.searchCategory(this.categoryForm.get('name').value) && !this.searchUserCategory(this.categoryForm.get('name').value)) {
        console.log('no match');
        this.currentUserCategory = Object.assign({}, this.categoryForm.value);
        console.log(this.currentUserCategory);
        this.stripExperiences();
        this.categoryService.createCategory(this.currentCategory);
        this.userService.addUserCategory(this.currentUserCategory);
        this.router.navigate(['dashboard']);
      } else {
        console.log('match in Categories');
        if (!this.searchUserCategory(this.categoryForm.get('name').value)) {
          console.log('no tracked_categories match');
          this.currentUserCategory = Object.assign({}, this.categoryForm.value);  // NOTE: Might need to change to .getRawValue() if the field is disabled
          this.userService.addUserCategory(this.currentUserCategory);
          this.router.navigate(['dashboard']);
        } else {
          this.message = 'you are already tracking this category - update not yet implemented';
          //todo update User with extra Category info in UserService
        }
        
      }
    } else {
      this.message = 'the form has errors';
    }

  }

  /*
	Searches and returns existing Category
  */
  searchCategory(name: string): Observable<Category> {
    var trimName = name.trim();
    var i;
    for (i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name.toUpperCase() === trimName.toUpperCase()) {
        return of(this.categories[i]);
      }
   }
    return null;
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


  private copyCategoryToUser(): void {
    this.user.tracked_categories.push(this.currentCategory);
    console.log(this.user, 'user in copy');

  }
  
   private stripExperiences(): void {
    this.currentCategory = {
      name: this.currentUserCategory.name,
      experiences: []
    };
    console.log(this.currentCategory, 'currentCategory stripped');
  
  }
}
