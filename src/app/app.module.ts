import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule ,HTTP_INTERCEPTORS, HttpClient} from '@angular/common/http';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';


=======
import { DataTablesModule } from 'angular-datatables';

import { AddclaimComponent } from './front-office/addclaim/addclaim.component';
import { MannageClaimsComponent } from './back-office/mannage-claims/mannage-claims.component';
import { EditClaimComponent } from './back-office/edit-claim/edit-claim.component';
import { MessageComponent } from './back-office/message/message.component';
import { DashboardclaimComponent } from './back-office/dashboardclaim/dashboardclaim.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
>>>>>>> parent of 6a2032a (fix errors of merge)




<<<<<<< HEAD
=======
import { AppointmentBackComponent } from './back-office/appointment-back/appointment-back.component';
import { FullCalendarModule } from '@fullcalendar/angular';
>>>>>>> parent of 6a2032a (fix errors of merge)




<<<<<<< HEAD
=======

const routes: Routes = [
  { 
    path: 'front', 
    component: FrontOfficeComponent,
    children: [
      { path: 'home', component: HomeComponent },

      { path: 'medical-folder', component: MedicalFolderComponent },
      { path:'Claims',component:AddclaimComponent},

      { path: 'medical-folder', component: MedicalFolderComponent }
      


      // Add more child routes as needed
    ]
  },
  { 
    path: 'back', 
    component: BackOfficeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'medical-folder-back', component: MedicalFolderBackComponent },

      { path: 'Claims', component: MannageClaimsComponent },
      { path: 'edit-claim/:id', component: EditClaimComponent },
      { path: 'Messages', component: MessageComponent },
      { path: 'dashbordClaim', component: DashboardclaimComponent },
      

      { path: 'appointment-back', component: AppointmentBackComponent }



      // Add more child routes as needed
    ]
  },
];

>>>>>>> parent of 6a2032a (fix errors of merge)
@NgModule({
  declarations: [
    AppComponent,
<<<<<<< HEAD
    NotFoundComponent,
    
=======
    FrontOfficeComponent,
    BackOfficeComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    MedicalFolderComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarbackComponent,
    MedicalFolderBackComponent,

    AddclaimComponent,
    MannageClaimsComponent,
    EditClaimComponent,
    MessageComponent,
    DashboardclaimComponent,

    AppointmentBackComponent

>>>>>>> parent of 6a2032a (fix errors of merge)
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
<<<<<<< HEAD
=======
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,

    ToastModule,

    FullCalendarModule




  ],
  exports: [
>>>>>>> parent of 6a2032a (fix errors of merge)
    RouterModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule
    
    
    
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

