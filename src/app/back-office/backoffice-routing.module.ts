import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from 'src/app/back-office/back-office.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthGuardAll } from 'src/app/guards/authAll.guard';
import { AuthGuardPatient } from 'src/app/guards/authpatient.guard';
import { AuthGuardLogged } from 'src/app/guards/authLogged.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListUserComponent } from 'src/app/back-office/dashboard/list-user/list-user.component';

const routes: Routes = [{
  path:'back',
  component:BackOfficeComponent,
  canActivate: [AuthGuardAll],
  children:[
    {
      path:'dash',
      component:DashboardComponent
    },
    {
      path:'userlist',
      component:ListUserComponent,
      canActivateChild: [AuthGuard] 
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }


