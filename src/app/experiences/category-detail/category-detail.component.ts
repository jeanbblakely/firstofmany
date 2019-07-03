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

  favoriteThis(experience: {}) {
    if (experience['favorite']) {
      experience['favorite'] = !experience['favorite'];
    } else {
      experience['favorite'] = true;
    };
    // Joey, could you offer some guidance here about updating the database?
  }

  getFavoriteIcon(favorited: boolean): String {
    return favorited ? 'favorite' : 'favorite_border';
  }
}
