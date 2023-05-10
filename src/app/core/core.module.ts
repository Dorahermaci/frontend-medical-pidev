import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { ApiUrlInjectionInterceptor } from './interceptors/api-url-injection.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      HttpClientModule,
    ],
    providers:[
     
      UserService,
      { provide: HTTP_INTERCEPTORS, useClass: ApiUrlInjectionInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  
    ],
  
  })
  export class CoreModule { }