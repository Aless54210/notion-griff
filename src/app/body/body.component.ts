import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models';
import { ElementRef } from '@angular/core';
import { DarkModeService } from 'angular-dark-mode';
import { AuthenticationService } from '../_services';
import { Router } from '@angular/router';

@Component({
    selector: 'app-body',
    templateUrl: 'body.component.html',
    styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
    loading = false;
    // theme variable
    isDarkMode: Boolean;
    trimmed = "5rem";
    expend = "16.5rem";
    @Input() collapsed = false;
    @Input() screenWidth = 0;

    constructor(
        private elementRef: ElementRef,
        public darkModeService: DarkModeService,
        public authenticationService: AuthenticationService,
        private router: Router
    ) {
        this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
    }

    async ngOnInit() {
    }

    getBodyClass(): string {
        let styleClass = '';

        if (this.collapsed && this.screenWidth > 768)
            styleClass = 'maincontent-trimmed';
        else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0)
            styleClass = 'maincontent-basic';
        return styleClass;
    }
}
