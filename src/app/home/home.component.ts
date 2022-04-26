import { Component, Input, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DarkModeService } from 'angular-dark-mode';
import { AuthenticationService } from '../_services';

@Component({
    templateUrl: 'home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    loading = false;
    // theme variable
    isDarkMode: Boolean;

    constructor(
        private elementRef: ElementRef,
        public darkModeService: DarkModeService,
        public authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
        if (!this.authenticationService.authenticated)
            router.navigate(['/login']);
    }

    async ngOnInit() {
    }

    getClass() {
        return this.isDarkMode ? 'dark-mode' : 'light-mode';
    }
}
