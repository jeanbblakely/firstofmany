import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  messages = []
  getMessage() {
    this.httpClient.get('http://localhost:3000/posts').subscribe(res =>{
      console.log(res);
    });
  }

}
