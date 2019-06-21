import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient,
    private router: Router) {}

  sendUserRegistration(regData) {
    this.httpClient.post('http://localhost:3000/account', regData).subscribe(res =>{
        console.log(res);
    });
  }

  loginUser(loginData) {
    this.httpClient.post('http://localhost:3000/login', loginData).subscribe(res =>{
        console.log(res['token']);
        if (res['token']) {
          console.log('Token exists');
          this.router.navigate(['dashboard']);
          console.log(loginData.username);
        }
    });
  }

}
