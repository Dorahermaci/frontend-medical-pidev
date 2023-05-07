import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { AddCourseComponent } from './back-office/Trainingcourse/add-course/add-course.component';
import { ListCourseComponent } from './back-office/Trainingcourse/list-course/list-course.component';
import { UpdateCourseComponent } from './back-office/Trainingcourse/update-course/update-course.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddCertificateComponent } from './back-office/Certificate/add-certificate/add-certificate.component';
import { ListCertificateComponent } from './back-office/Certificate/list-certificate/list-certificate.component';
import { ToastrModule } from 'ngx-toastr';
import { UpdateCertificateComponent } from './back-office/Certificate/update-certificate/update-certificate.component';
import { CourseinformationComponent } from './back-office/Trainingcourse/courseinformation/courseinformation.component';
import { ListcoursefrontComponent } from './front-office/listcoursefront/listcoursefront.component';
import { AccumulationChartModule } from '@syncfusion/ej2-angular-charts';
import { StatsComponent } from './back-office/Trainingcourse/stats/stats.component';
import { CommonModule } from '@angular/common';

import { SchedulerModule } from 'angular-calendar-scheduler';

import { UpdateRegisterComponent } from './back-office/Register/update-register/update-register.component';
import { ListRegisterComponent } from './back-office/Register/list-register/list-register.component';
import { SchedularComponent } from './schedular/schedular.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter, MOMENT } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  { path: 'add-course', component: AddCourseComponent },
  { path: 'list-coursee', component: ListCourseComponent },
  { path: 'list-certificatee', component: ListCertificateComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent },
  { path: 'update-certificate/:id', component: UpdateCertificateComponent },
  { path: 'add-certificate', component: AddCertificateComponent },
  { path: 'Details/:id', component: CourseinformationComponent },
  { path: 'front-coursee', component: ListcoursefrontComponent },
  { path: 'stats/:id', component: StatsComponent },
  { path: 'update-register/:id', component: UpdateRegisterComponent },
  { path: 'ListeRegisterBack', component: ListRegisterComponent },
  { path: 'schedular', component: SchedularComponent },
  { 
    path: 'front', 
    component: FrontOfficeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'medical-folder', component: MedicalFolderComponent },
      
     

      // Add more child routes as needed
    ]
  },
  { 
    path: 'back', 
    component: BackOfficeComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'medical-folder-back', component: MedicalFolderBackComponent },
      { path: 'list-course', component: ListCourseComponent },
      { path: 'list-certificate', component: ListCertificateComponent },
      { path: 'ListeRegisterBack', component: ListRegisterComponent },
     

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
    StatsComponent,
    FooterComponent,
    MedicalFolderComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarbackComponent,
    MedicalFolderBackComponent,
    AddCourseComponent,
    ListCourseComponent,
    UpdateCourseComponent,
    AddCertificateComponent,
    ListCertificateComponent,
    UpdateCertificateComponent,
    CourseinformationComponent,
    ListcoursefrontComponent,
  
    UpdateRegisterComponent,
    ListRegisterComponent,
    SchedularComponent,
   
   
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    AccumulationChartModule ,
    ToastrModule.forRoot(),
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    NgbModalModule,
    CommonModule,
   SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
     { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: MOMENT, useValue: MOMENT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
