import { Component, OnInit, ViewChild, Input, SimpleChange, EventEmitter, Output } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Experience } from 'src/app/models/experience';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({height: '0px'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class ExperiencesComponent implements OnInit {
  @Input() category: Category;
  @Output() backClicked = new EventEmitter<number>();
  dataSource: MatTableDataSource<Experience>;
  columnsToDisplay: string[] = ['favorite', 'name', 'datestamp'];
  expandedElement: Experience | null;
  selectedIndex: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.category.experiences);
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
     * Deletes an experience from a category
     * @param experience Experience to delete
     */
  deleteExperience(experience: Experience) {
    this.selectedIndex = 2;
    console.log("Delete " + experience.name + ", please!");
  }
}
