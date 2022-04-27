import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services';
import { DarkModeService } from 'angular-dark-mode';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({ selector: 'app-sidenav', templateUrl: 'sidebar.component.html', styleUrls: ['./sidebar.component.css'] })
export class SidebarComponent implements OnInit {
  callClass = false;
  isDarkMode: Boolean;
  collapsed = false;
  navData = navbarData;
  screenWidth = 0;
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private darkModeService: DarkModeService
  ) {
    this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
  }

  async ngOnInit() {
    this.screenWidth = window.innerWidth;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav() {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}