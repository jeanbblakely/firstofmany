import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient,
    private router: Router) {}

  messages = []
  getMessage() {
    this.httpClient.get('http://localhost:3000/posts').subscribe(res =>{
      console.log(res);
    });
  }

  sendUserRegistration(regData) {
    this.httpClient.post('http://localhost:3000/account', regData).subscribe(res =>{
        console.log(res);
    });
  }

  loginUser(loginData) {
    this.httpClient.post('http://localhost:3000/login', loginData).subscribe(res =>{
        console.log(res);
    });
  }

}
