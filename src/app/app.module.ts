import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BodyComponent} from './body/body.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {LogoutComponent} from './logout/logout.component';
import {DarkmodeComponent} from './darkmode/darkmode.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {DarkModeService} from 'angular-dark-mode';
import {RouterModule} from '@angular/router';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DetailsComponent} from './details/details.component';
@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    LogoutComponent,
    DarkmodeComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
    RouterModule.forRoot([])
  ],
  providers: [
    DarkModeService,
    DarkmodeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
