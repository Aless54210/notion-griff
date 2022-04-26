import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { AuthenticationService } from '../_services';
import { User } from '../_models';

@Component({ templateUrl: './register.component.html', styleUrls: ['./register.component.css'] })
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    currentUser: User;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    responseDB = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private elementRef: ElementRef
    ) {

    }

    async ngOnInit() {
        this.registerForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required]
        });
        await this.authenticationService.loadUser();
        if (this.authenticationService.authenticated)
            this.router.navigate(['/']);
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    async onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        // root to send id to Back-End
        let res = await fetch("http://localhost:8080/user/register", {
            method: "POST",
            body: JSON.stringify({
                firstname: this.f.firstname.value,
                lastname: this.f.lastname.value,
                email: this.f.email.value,
                password: this.f.password.value
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(response => {
                return response.json();
            })
            .catch(function (err) {
                console.error(err);
            })


        if (res.success) {
            this.router.navigate(["/login"]);
        } else {
            this.error = res.message;
            this.loading = false;
        }
        // Check values in form and redirect to login page if everything ok
        // this.authenticationService.register(this.f.username.value, this.f.password.value)
        //     .subscribe(
        //         data => {
        //             this.router.navigate(["/login"]);
        //         },
        //         error => {
        //             this.error = error;
        //             this.loading = false;
        //         }
        //     );
    }
}
