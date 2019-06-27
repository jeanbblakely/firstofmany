import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient,
    private router: Router) {}

    path = environment.path
    authpath = environment.path + '/auth';

  sendUserRegistration(regData) {
    this.httpClient.post(this.authpath + '/register', regData).subscribe(res =>{
        console.log(res);
    });
  }

  loginUser(loginData) {
    this.httpClient.post(this.authpath + '/login', loginData).subscribe(res =>{
        console.log(res['token']);
        if (res['token']) {
          console.log('Token exists');
          console.log(loginData._id);
          this.router.navigate(['dashboard']);
          console.log(loginData.username);
        }
    });
  }

}
