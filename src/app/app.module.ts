import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { DarkModeToggle } from './dark-mode-toggle.component';
import { DarkModeService, DARK_MODE_OPTIONS } from 'angular-dark-mode';
import { SidebarComponent } from './sidebar';
import { BodyComponent } from './body';
import { LogoutComponent } from './logout';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DarkModeToggle,
    SidebarComponent,
    BodyComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forRoot([]),
  ],
  providers: [
    DarkModeService,
    DarkModeToggle
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
