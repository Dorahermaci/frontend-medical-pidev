import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DIALOG_DATA , MatDialogRef } from '@angular/material/dialog';
import { FrontofficeRoutingModule } from './frontoffice-routing.module';
import { HomeComponent } from './home/home.component';
import { FrontOfficeComponent } from 'src/app/front-office/front-office.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CoreModule } from 'src/app/core/core.module';
import { RegisterComponent } from './register/register.component';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmTokenComponent } from './confirm-token/confirm-token.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AccountIconComponent } from './account-icon/account-icon.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';








@NgModule({
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    
  ],

  declarations: [
    HomeComponent,
    FrontOfficeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmTokenComponent,
    ResetpasswordComponent,
    AccountIconComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent
   
  ],
  imports: [ 
    FrontofficeRoutingModule, 
    CoreModule,
    FormsModule,
    CommonModule,
    NgxCaptchaModule,
    ReactiveFormsModule,
    MatDialogModule,
    
    
    
    
    
    
    
  ]
})
export class FrontofficeModule { }
