import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { NavbarbackComponent } from 'src/app/back-office/navbarback/navbarback.component';
import { SidebarComponent } from 'src/app/back-office/sidebar/sidebar.component';
import { ListUserComponent } from 'src/app/back-office/dashboard/list-user/list-user.component';






import { BackOfficeComponent } from 'src/app/back-office/back-office.component';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
  BackOfficeComponent,
   DashboardComponent,
   NavbarbackComponent,
   SidebarComponent,
   ListUserComponent
   
  ],
  imports: [ 
    BackofficeRoutingModule,
    CommonModule,
    CoreModule,
    FormsModule,
    
   

  ]
})
export class BackofficeModule { }
