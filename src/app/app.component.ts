import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { MatSnackBar } from '@angular/material';
import { TourService, IStepOption } from 'ngx-tour-md-menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'the First of Many';

  constructor(private userService: UserService, private snackBar: MatSnackBar, public tourService: TourService) {
    this.userService.logout$.subscribe(() => {
      this.snackBar.open('You are logged out', 'Okay', { duration: 2000 });
    });
    this.userService.newUser$.subscribe((tourStart) => {
      if (tourStart) {
        this.tourService.start();
      }
    });
    
    this.tourService.start$.subscribe(() => {
      console.log('Tour started');
    });
    this.tourService.stepShow$.subscribe((step: IStepOption) => {
      if (step.stepId == 'categories-added') {
        setTimeout(() => {
          this.tourService.next();
        }, 500);
      }
    });
    this.tourService.end$.subscribe(() => {
      console.log("Thanks for taking the tour. You can take it again by going to your My Account page.");
    });

    this.tourService.initialize([
      {
        anchorId: 'start-tour',
        content: 'Thanks for registering and welcome to First of Many!',
        placement: 'center',
        title: 'Hi!',
      }, {
        anchorId: 'your-categories',
        content: "First of Many is an app to track all of life's experiences! Here are all the categories want to keep track of.",
        title: 'Your categories',
      }, {
        anchorId: 'add-categories',
        content: "To start tracking your first experiences, you first need to add some categories.",
        title: 'Add categories',
      }, {
        stepId: 'add-categories-dialog',
        anchorId: 'add-categories-start',
        content: "Anything you experience for the first time, can be tracked! Here are a few suggestions.",
        title: 'Add categories',
        route: '/dashboard?categories=true'
      }, {
        anchorId: 'add-categories-search',
        content: "You can search for categories here.",
        title: 'Search categories',
        route: '/dashboard?categories=true'
      }, {
        anchorId: 'add-categories-create',
        content: "If you don't find what you're looking for, you can create a new category, too!",
        title: 'Create categories',
        route: '/dashboard?categories=true'
      }, {
        anchorId: 'add-categories-add',
        content: "Once you select some categories, don't forget to click 'Add'",
        title: 'Add some categories',
        route: '/dashboard?categories=true'
      }, {
        stepId: 'categories-added',
        anchorId: 'categories-added',
        content: "Now that you have some categories, let's add an experience.",
        title: 'Your categories',
        route: '/dashboard',
      }, {
        anchorId: 'categories-added',
        content: "Now that you have some categories, let's add an experience.",
        title: 'Your categories',
        route: '/dashboard',
      }, {
        stepId: 'experiences-tab',
        anchorId: 'add-experiences',
        content: "Here are all of your first (of many) experiences. You don't have any yet. But you will soon!",
        title: 'Your first experience',
        enableBackdrop: false,
        route: '/dashboard?category-details=true'
      }, {
        anchorId: 'all-done',
        content: "Thanks for taking the tour! We hope you enjoy your first of many visits to this app! You can always watch this tour again from your My Account page.",
        title: 'Thank you!',
        enableBackdrop: false,
        route: '/dashboard?all-categories=true',
      }], {
        enableBackdrop: true,
        route: '/dashboard',
        preventScrolling: true,
      });
  }

  ngOnInit() { }

}
