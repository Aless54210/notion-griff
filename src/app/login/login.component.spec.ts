import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from '../login';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from '../_services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('LoginComponent', () => {
    let loginComponent: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authenticationService: AuthenticationService;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule],
        declarations: [ LoginComponent ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(LoginComponent);
      loginComponent = fixture.componentInstance;
      authenticationService = TestBed.get(AuthenticationService);
      fixture.detectChanges();
    });
    it('should not connect with two wrong id', () => {
      loginComponent.loginForm.setValue({ username: 'te', password: 'te' });
      loginComponent.onSubmit();
      expect(loginComponent.error).toEqual("");
    });
    it('should not connect with wrong password', () => {
      loginComponent.loginForm.setValue({ username: 'test', password: 'te' });
      loginComponent.onSubmit();
      expect(loginComponent.error).toEqual("");
    });
    it('should not connect with wrong username', () => {
      loginComponent.loginForm.setValue({ username: 'te', password: 'test' });
      loginComponent.onSubmit();
      expect(loginComponent.error).toEqual("");
    });
    it('should connect', () => {
      loginComponent.loginForm.setValue({ username: 'test', password: 'test' });
      loginComponent.onSubmit();
      expect(loginComponent.error).toEqual("");
    });
    it('should username required', () => {
      loginComponent.loginForm.setValue({ username: '', password: 'te' });
      loginComponent.onSubmit();
      expect(loginComponent.f.username.errors.required).toEqual(true);
    });
    it('should password required', () => {
      loginComponent.loginForm.setValue({ username: 'te', password: '' });
      loginComponent.onSubmit();
      expect(loginComponent.f.password.errors.required).toEqual(true);
    });
  });
