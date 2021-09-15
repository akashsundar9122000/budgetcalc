import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { EditComponent } from './edit/edit.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TotalComponent } from './total/total.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'budget',component:TotalComponent,canActivate:[AuthGuard]},
  {path:'edit',component:EditComponent,canActivate:[AuthGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'error',component:ErrorComponent},
  { path: '**', pathMatch: 'full',
        component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
