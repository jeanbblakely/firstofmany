import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Category } from '../../models/category';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
})
export class CategoryDetailComponent  {
  @Input() category: Category;
  @Output() backClicked = new EventEmitter<number>();

  constructor(private userService: UserService) { }

  /**
   * Deletes the category
   */
  deleteCategory() {
    // console.log("Delete " + this.category.name + ", please!");
    if (confirm("Are you sure you want to delete " + this.category.name + "?")) {
      this.userService.deleteUserCategory(this.category);
      this.backClicked.emit();
    }
    
  }
}
