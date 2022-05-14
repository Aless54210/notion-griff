import {Component,OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {ElementRef} from '@angular/core';
import {AuthenticationService} from '../_services';
import {faMailBulk} from '@fortawesome/free-solid-svg-icons';
import {faLock} from '@fortawesome/free-solid-svg-icons';
import {environment} from "../../environments/environment";

@Component({templateUrl: 'login.component.html',styleUrls: ['./login.component.css']})
export class LoginComponent implements OnInit {
  faMailBulk = faMailBulk;
  faLock = faLock;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private elementRef: ElementRef
  ) {
  }

  async ngOnInit() {
    // required inputs in form
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    await this.authenticationService.loadUser();
    if(this.authenticationService.authenticated)
      this.router.navigate(['/']);
  }

  // convenience getter for easy access to form fields
  get f() {return this.loginForm.controls;}

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if(this.loginForm!.invalid) {
      return;
    }

    // Load and active the spinner
    this.loading = true;
    // root to send ID of connection to check if ID in database
    let res = await fetch(`${environment.URL_API}/api/user/login`,{
      method: "POST",
      body: JSON.stringify({
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
      .catch(function(err) {
        console.error(err.message);
      });

    if(res.success) {
      const {accessToken,refreshToken} = res.data;
      this.authenticationService.login(accessToken,refreshToken);
      this.router.navigate(['/']);
    } else {
      this.error = res.message;
      this.loading = false;
    }
  }
}
