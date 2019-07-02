import { Injectable } from '@angular/core';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Category } from '../models/category';
import { CATEGORIES } from '../mock-categories';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }
  
  
  /*
	Gets array of Categories
  */
  getCategories(): Observable<Category[]> {
    return of(CATEGORIES);
  }
  
  
   /*
	Creates new Category in db
  */
  createCategory(category: Category): Observable<Category> {
    //todo Add Category object to db 
    return of(CATEGORIES[0]);
  }
}
