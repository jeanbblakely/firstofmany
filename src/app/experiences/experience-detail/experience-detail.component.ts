import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Experience } from 'src/app/models/experience';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-experience-detail',
  templateUrl: './experience-detail.component.html',
  styleUrls: ['./experience-detail.component.css']
})
export class ExperienceDetailComponent implements OnInit {
  category: Category;
  experience: Experience;
  isAdd: boolean = false;
  isUpdate: boolean = false;
  form: FormGroup;
  maxDate = new Date(Date.now() + 24 * 60 * 60 * 1000);

  constructor(private userService: UserService,
    private dialogRef: MatDialogRef<ExperienceDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data, private fb: FormBuilder) {
    this.category = data.category;
    console.log(data.experience.name, 'experience');
    if (data.experience.name == undefined || data.experience.name == '') {
      
      this.isAdd = true;
    }
    this.isUpdate = !this.isAdd;
    this.experience = data.experience;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: [this.experience.name, [Validators.required]],
      datestamp: [this.experience.datestamp, [Validators.required]],
      note: [this.experience.note]
    });
  }

  /**
 * Gets the appropriate favorite icon
 * @param favorited if experience has been favorited
 */
  getFavoriteIcon(favorited: boolean): String {
    return favorited ? 'favorite' : 'favorite_border';
  }

  /**
   * Toggles the favorite button icon
   */
  toggleFavorite() {
    if (this.experience.hasOwnProperty('favorite')) {
      this.experience['favorite'] = !this.experience['favorite'];
    } else {
      this.experience['favorite'] = false;
    };
  }

  /**
   * Checks form for errors
   */
  hasError = (controlName: string, errorName: string) => {
    return this.form.controls[controlName].hasError(errorName);
  }

  /**
   * Submits the form and adds/updates the database
   * @param form The completed form
   */
  submit(form: FormGroup) {
    if (this.form.valid) {
      let previous = new Experience();
      previous.name = this.experience.name;
      this.experience.name = form.controls['name'].value;
      this.experience.datestamp = form.controls['datestamp'].value;
      this.experience.note = form.controls['note'].value;
      if (this.isAdd) {
        this.userService.addUserExperience(this.category.name, this.experience).subscribe();
      } else {
        this.userService.deleteUserExperience(this.category.name, previous).subscribe(res => {
          this.userService.addUserExperience(this.category.name, this.experience).subscribe();
        });

      }
      this.dialogRef.close({ action: this.isAdd ? 'add' : 'update', experience: this.experience });
      // Snackbar ?
    }
  }

  /**
   * Deletes an experience from the user's category
   */
  deleteExperience() {
    if (confirm("Are you sure you want to delete this experience?")) {
      this.userService.deleteUserExperience(this.category.name, this.experience).subscribe();
      // Snackbar ?
      this.dialogRef.close({ action: 'delete', experience: this.experience });
    }
    
  }
}
