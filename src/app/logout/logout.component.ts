import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({ templateUrl: 'logout.component.html' })
export class LogoutComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.logout();
        if (!this.authenticationService.authenticated)
            this.router.navigate(['/login']);
    }
}
