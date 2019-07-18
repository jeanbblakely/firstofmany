import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  public username = '';
  public security_question = 'this';
  public resetData: FormGroup;

  public message: string = '';
  constructor(private userService: UserService,
    private router: Router, private fb: FormBuilder) {
      this.createForm();
    }

 /*
	Checks form for errors
  */
  public hasError = (controlName: string, errorName: string) => {
    return this.resetData.controls[controlName].hasError(errorName);
  }

   /*
	Creates resetData based on input
  */
  private createForm() {
    this.resetData = this.fb.group({
      username: [null, [Validators.required]],
      security_answer: [null, [Validators.required]],
    });
  }

}
