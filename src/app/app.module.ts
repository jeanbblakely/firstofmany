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
import { MaterialModule } from './material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './user/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    DashboardComponent,
    AccountComponent,
    LoginComponent,
    HomeComponent,
    ExperiencesComponent,
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    UserService,
    ApiService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
