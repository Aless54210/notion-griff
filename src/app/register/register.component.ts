import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

import { AuthenticationService } from '../_services';

@Component({ templateUrl: './register.component.html', styleUrls: ['./register.component.css'] })
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  responseDB = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  async ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      username: ['', Validators.required]
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
    let res = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      body: JSON.stringify({
        username: this.f.username.value,
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
  }
}
