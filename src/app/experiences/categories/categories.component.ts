import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  mockCategories = [
    {name: 'Vegetables'},
    {name: 'Fruit'}, 
    {name: 'Countries'},
    {name: 'Movies'},
    {name: 'Thrills'},
    {name: 'Cuisines'}
  ];
  colors = [
    '#f24236', // cat-red: #f24236;
    '#f7844f', // cat-orange: #f7844f;
    '#ffcc49', // cat-yellow: #ffcc49;
    '#c3f74f', // cat-green: #c3f74f;
    '#4ff7d8', // cat-sea-green: #4ff7d8;
    '#4f6ef7', // cat-blue: #4f6ef7;
    '#844ff7', // cat-purple: #844ff7;
    '#f74fc2', // cat-pink: #f74fc2;
  ]

  constructor() { }

  ngOnInit() {
    this.getRandomColors();
  }

  getRandomColors() {
    for (let i = 0; i < this.mockCategories.length; i++) {
      this.mockCategories[i]['color'] = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
  }
}
