import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FrontOfficeComponent } from 'src/app/front-office/front-office.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardLogged } from 'src/app/guards/authLogged.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirect to '/login' by default
    pathMatch: 'full'
  },
  {
    path: '',
    component: FrontOfficeComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivateChild: [AuthGuardLogged]
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'reset-password',
        component: ResetpasswordComponent,
        canActivateChild: [AuthGuardLogged]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivateChild: [AuthGuardLogged] 
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontofficeRoutingModule { }
