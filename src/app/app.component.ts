import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './_models';
import { DarkModeService } from 'angular-dark-mode';

declare var jQuery: any;
declare var $: any;

interface SideNavToggle {
    screenWidth: number;
    collapsed: boolean;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Assignment04';
    callClass = false;
    isDarkMode: Boolean;
    isSideNavCollapsed = true;
    screenWidth = 0;

    constructor(
        private router: Router,
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