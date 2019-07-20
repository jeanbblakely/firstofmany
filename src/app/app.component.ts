import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { MatSnackBar } from '@angular/material';
import { TourService } from 'ngx-tour-md-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the First of Many';

  constructor(private userService: UserService, private snackBar: MatSnackBar, public tourService: TourService) {
    userService.logout$.subscribe(() => {
        this.snackBar.open('You are logged out', 'Okay', {duration: 2000});
      }
    )
    this.tourService.initialize([
      {
        anchorId: 'start-tour',
        content: 'Thanks for registering and welcome to First of Many!',
        placement: 'center',
        title: 'Welcome',
      }, {
        anchorId: 'your-categories',
        content: "First of Many is an app to track all of life's experiences!\nHere are all the categories want to keep track of.",
        title: 'Your categories',
      }, {
        anchorId: 'add-categories',
        content: "To start tracking your first experiences, you first need to add some categories.",
        title: 'Add categories',
        enableBackdrop: false,
      }, {
        anchorId: 'add-categories-start',
        content: "Anything you experience for the first time, can be tracked! Here are a few suggestions.",
        placement: 'center',
        enableBackdrop: false,
        title: 'Add categories'
      }, {
        anchorId: 'add-categories-search',
        content: "You can search for categories here.",
        title: 'Search categories',
      }, {
        anchorId: 'add-categories-create',
        content: "If you don't find what you're looking for, you can create a new category, too!",
        title: 'Create categories',
      }, {
        anchorId: 'add-some-categories',
        content: "Go ahead and add some categories.\nWe'll continue to tour when you're finished.",
        enableBackdrop: false,
        title: 'Add some categories',
      }, {
        anchorId: 'user-categories',
        content: "Now that you have some categories, let's add an experience.\nClick a category.",
        title: 'Your categories',
        enableBackdrop: false,
        route: '/dashboard',
      }, {
        anchorId: 'add-experiences',
        content: "Here are all of your first (of many) experiences. You don't have any yet.\nClick here to add your first experience.",
        title: 'Your first experience',
        enableBackdrop: false,
        route: '/dashboard',
      }, {
        anchorId: 'all-done',
        content: "Thanks for taking the tour! We hope you enjoy your first of many visits to this app!",
        title: 'Thank you!',
        route: '/dashboard',
      }], {
        enableBackdrop: true,
        route: '/dashboard',
      });
    this.tourService.start();
  }

  ngOnInit() {}

}
