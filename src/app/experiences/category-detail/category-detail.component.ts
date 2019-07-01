import { Component, Inject } from '@angular/core';
import { Category } from '../../models/category';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent {
  category: Category;

  constructor(private dialogRef: MatDialogRef<CategoryDetailComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.category = data;
   }
}
