import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firstofmany';

  constructor(private apiService: ApiService){}

  ngOnInit() {
    this.apiService.getMessage();
  }
}
