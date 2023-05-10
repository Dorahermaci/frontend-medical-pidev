import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  {
    path:"",
    loadChildren:() => import('src/app/front-office/frontoffice.module').then(m => m.FrontofficeModule)
    
  },  

  {
    path:"",
    loadChildren:() => import('src/app/back-office/backoffice.module').then(m => m.BackofficeModule)
  },
  { path: '**', component: NotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


