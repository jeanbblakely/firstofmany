import { Component, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Experience } from 'src/app/models/experience';
import { Category } from 'src/app/models/category';
import { UserService } from 'src/app/services/user.service';
import { ExperienceDetailComponent } from '../experience-detail/experience-detail.component';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
})
export class ExperiencesComponent {
  @Input() category: Category;
  dataSource: MatTableDataSource<Experience>;
  columnsToDisplay: string[] = ['favorite', 'name', 'datestamp', 'note'];
  selectedIndex: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnChanges() {
    this.updateTable();
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
   * Opens a dialog to add, update, or delete an experience
   * @param experience The experience to update or undefined
   */
  openExperienceDialog(experience: Experience) {
    const dialogRef = this.dialog.open(ExperienceDetailComponent, {
      width: '70%',
      minWidth: 250,
      maxWidth: 500,
      autoFocus: true,
      restoreFocus: true,
      disableClose: false,
      closeOnNavigation: true,
      panelClass: 'experiences-dialog',
      data: { category: this.category, experience: experience || new Experience }
    }).afterClosed().subscribe(result => {
      if (result != undefined) {
        this.userService.getUserCategories().subscribe(categories => {
          for (let i = 0; i < categories.length; i++) {
            if (categories[i].name == this.category.name) {
              this.category = categories[i];
              this.updateTable();
            }
          }
        });
      }
    });
  }

  /**
   * Updates the table when data changes
   */
  private updateTable() {
    this.dataSource = new MatTableDataSource<Experience>(this.category.experiences);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
