import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CategoriesComponent } from './experiences/categories/categories.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AccountComponent } from './user/account/account.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ExperiencesComponent } from './experiences/experiences/experiences.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DashboardComponent,
    AccountComponent,
    LoginComponent,
    HomeComponent,
    ExperiencesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
