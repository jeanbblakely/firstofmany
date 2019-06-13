import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  public username: string = '';
  public password: string = '';
  public message: string = '';

  constructor() { }

  ngOnInit() {
  }

}
