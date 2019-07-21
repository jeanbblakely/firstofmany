import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { AccountComponent } from './user/account/account.component';
import { DashboardComponent } from './user/dashboard/dashboard.component';
import { RegisterComponent } from './user/register/register.component';
import { CategoryCreateComponent } from './experiences/category-create/category-create.component';
import { AuthGuard } from './guards/auth.guard';
import { PasswordResetComponent } from './user/password-reset/password-reset.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'password-reset', component: PasswordResetComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  { path: 'category-create', component: CategoryCreateComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutesModule { }
