import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatFormFieldModule, MatInputModule, MatIconModule, MatCardModule, MatListModule } from '@angular/material';
import { FooterComponent } from './navigation/footer/footer.component';
import { CategoryDetailComponent } from './experiences/category-detail/category-detail.component';
import { CategoryService } from './services/category.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CategoryCreateComponent } from './experiences/category-create/category-create.component';
import { AuthInterceptorService } from './services/authinterceptor.service';
import { AngularFittextModule } from 'angular-fittext';
import { SpacebreakPipe } from './_pipes/spacebreak.pipe';
import { DisableControlDirective } from './_directives/disable-control.directive';
import { EqualValidatorDirective } from './_directives/equal-validator.directive';
import { ServerErrorInterceptor } from './interceptor/server-error.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';
import { AddCategoriesComponent } from './experiences/add-categories/add-categories.component';
import { ExperienceDetailComponent } from './experiences/experience-detail/experience-detail.component';
import { TourMatMenuModule } from 'ngx-tour-md-menu';

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
    RegisterComponent,
    FooterComponent,
    CategoryDetailComponent,
    CategoryCreateComponent,
    SpacebreakPipe,
    DisableControlDirective,
    EqualValidatorDirective,
    PasswordResetComponent,
    AddCategoriesComponent,
    ExperienceDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutesModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFittextModule,
    TourMatMenuModule.forRoot()
  ],
  providers: [
    UserService,
    CategoryService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
    
  ],

  bootstrap: [AppComponent],
  entryComponents: [AddCategoriesComponent, ExperienceDetailComponent]
})
export class AppModule { }
