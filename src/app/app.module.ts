import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TotalComponent } from './total/total.component';
import { IncommingComponent } from './incomming/incomming.component';
import { OutgoingComponent } from './outgoing/outgoing.component';
import { FormsModule } from '@angular/forms';
import { DisplayIncommingComponent } from './display-incomming/display-incomming.component';
import { DisplayOutgoingComponent } from './display-outgoing/display-outgoing.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TotalComponent,
    IncommingComponent,
    OutgoingComponent,
    DisplayIncommingComponent,
    DisplayOutgoingComponent,
    EditComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ErrorComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
