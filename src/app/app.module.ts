import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FrontOfficeComponent } from './front-office/front-office.component';
import { BackOfficeComponent } from './back-office/back-office.component';
import { HomeComponent } from './front-office/home/home.component';
import { NavbarComponent } from './front-office/navbar/navbar.component';
import { FooterComponent } from './front-office/footer/footer.component';
import { MedicalFolderComponent } from './front-office/medical-folder/medical-folder.component';
import { DashboardComponent } from './back-office/dashboard/dashboard.component';
import { SidebarComponent } from './back-office/sidebar/sidebar.component';
import { NavbarbackComponent } from './back-office/navbarback/navbarback.component';
import { MedicalFolderBackComponent } from './back-office/medical-folder-back/medical-folder-back.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { AppointmentBackComponent } from './back-office/appointment-back/appointment-back.component';
import { FullCalendarModule } from '@fullcalendar/angular';




const routes: Routes = [
  { 
    path: 'front', 
    component: FrontOfficeComponent,
    children: [
      { path: 'home', component: HomeComponent },
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
      { path: 'appointment-back', component: AppointmentBackComponent }


      // Add more child routes as needed
    ]
  },
];

@NgModule({
  declarations: [
    
    AppComponent,
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
    AppointmentBackComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    DataTablesModule,
    FullCalendarModule,



  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
