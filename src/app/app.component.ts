import {Component} from '@angular/core';
import {AuthenticationService} from './_services';
import {DarkModeService} from 'angular-dark-mode';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notion-griff';
  callClass = false;
  isDarkMode: Boolean;
  isSideNavCollapsed = true;
  screenWidth = 0;

  constructor(
    private darkModeService: DarkModeService,
    private authenticationService: AuthenticationService,
  ) {
    this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
  }

  async ngOnInit() {
    await this.authenticationService.loadUser();
  }

  getClass() {
    return this.authenticationService.authenticated ? 'auth' : 'not-auth';
  }

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
