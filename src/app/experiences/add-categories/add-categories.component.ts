import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categories: Category[];

  constructor(private dialogRef: MatDialogRef<AddCategoriesComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.categories = data;
  }

  ngOnInit() {
  }

  
  /**
   * Closes the dialog
   */
  close() {
    this.dialogRef.close();
  }
}
