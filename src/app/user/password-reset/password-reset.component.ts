import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from './../../models/user';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent {
  public username = '';
  public security_question = '';
  public resetData: FormGroup;
  public hide = true;

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
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

     /*
	Gets security question based on username
  */
  getSecurityQuestion(): void {
    this.security_question = "I am a security question";
    const result: User = Object.assign({}, this.resetData.value);
    console.log('after copy', result);
    console.log(this.resetData.get('username').value, 'username');
    this.userService.getSecurityQuestion(this.resetData.get('username').value).subscribe(res => {
      this.security_question = res['question'];
    });
  }

    /*
	Resets user password if security answer matches
  */
  reset() {
    if (this.resetData.valid) {
      const result: User = Object.assign({}, this.resetData.value);
      console.log('after copy', result);
      this.userService.resetPassword(result);
      this.router.navigate(['dashboard']);
    } else {
      this.message = 'your form has errors';
    }
  }

}
