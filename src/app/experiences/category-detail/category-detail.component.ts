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

  /**
   * Favorites an experiences
   */
  favoriteThis(experience: {}) {
    if (experience.hasOwnProperty('favorite')) {
      experience['favorite'] = !experience['favorite'];
    } else {
      experience['favorite'] = false;
    };
    // Joey, could you offer some guidance here about updating the database?
  }

  /**
   * Gets the appropriate favorite icon
   * @param favorited if experience has been favorited
   */
  getFavoriteIcon(favorited: boolean): String {
    return favorited ? 'favorite' : 'favorite_border';
  }

  close() {
    this.dialogRef.close();
  }
}
