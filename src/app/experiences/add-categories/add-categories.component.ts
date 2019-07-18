import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort } from '@angular/material';
import { Category } from 'src/app/models/category';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  categories: Category[];
  displayedColumns: string[] = ['select', 'name'];
  dataSource: MatTableDataSource<Category>;
  selection = new SelectionModel<Category>(true, []);
  
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialogRef: MatDialogRef<AddCategoriesComponent>, @Inject(MAT_DIALOG_DATA) data) { 
    this.categories = data;
    this.dataSource = new MatTableDataSource(this.categories);
  }

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Category): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.name}`;
  }

  /**
   * Closes the dialog
   */
  close() {
    this.dialogRef.close();
  }
}
