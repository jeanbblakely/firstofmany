import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './experiences/categories/categories.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { AccountComponent } from './user/account/account.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { ExperiencesComponent } from './experiences/experiences/experiences.component';
import { AppRoutesModule } from './app-routes.module';
import { UserService } from './services/user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';

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
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    UserService,
    ApiService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
