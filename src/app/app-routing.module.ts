import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {DetailsComponent} from './details/details.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';

const routes: Routes = [
  {path: '',component: HomeComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: 'logout',component: LogoutComponent},
  {path: 'details',component: DetailsComponent},
  {path: '**',component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {}
