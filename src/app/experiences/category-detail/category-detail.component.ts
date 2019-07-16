import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatSort, MatPaginator, Sort } from '@angular/material';
import { Experience } from 'src/app/models/experience';
import { trigger, state, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class CategoryDetailComponent implements OnInit {
  category: Category;
  dataSource: MatTableDataSource<Experience>;
  columnsToDisplay: string[] = ['favorite', 'name', 'datestamp'];
  expandedElement: Experience | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialogRef: MatDialogRef<CategoryDetailComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.category = data;
    this.dataSource = new MatTableDataSource(this.category.experiences);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Filters the table
   * @param filterValue text used to filter
   */
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

  /**
   * Closes the dialog
   */
  close() {
    this.dialogRef.close();
  }

  /**
   * Deletes an experience from a category
   * @param experience Experience to delete
   */
  deleteExperience(experience: Experience) {
    console.log("Delete " + experience.name + ", please!");
  }
}
