import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule
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
import { AddclaimComponent } from './front-office/addclaim/addclaim.component';
import { MannageClaimsComponent } from './back-office/mannage-claims/mannage-claims.component';
import { EditClaimComponent } from './back-office/edit-claim/edit-claim.component';
import { MessageComponent } from './back-office/message/message.component';





const routes: Routes = [
  { 
    path: 'front', 
    component: FrontOfficeComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'medical-folder', component: MedicalFolderComponent },
      { path:'Claims',component:AddclaimComponent}

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
      { path: 'Messages', component: MessageComponent }

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
    AddclaimComponent,
    MannageClaimsComponent,
    EditClaimComponent,
    MessageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule



  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
