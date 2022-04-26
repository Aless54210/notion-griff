import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from '../register';
import { Observable, of } from 'rxjs';

import { AuthenticationService } from '../_services';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('RegisterComponent', () => {
    let registerComponent: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let authenticationService: AuthenticationService;
  
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, RouterTestingModule, HttpClientModule],
        declarations: [ RegisterComponent ]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(RegisterComponent);
      registerComponent = fixture.componentInstance;
      authenticationService = TestBed.get(AuthenticationService);
      fixture.detectChanges();
    });
    it('should not subscribe with two wrong id', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'te', password: 'te' });
      registerComponent.onSubmit();
      expect(registerComponent.error).toEqual("");
    });
    it('should not subscribe with wrong password', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'test', password: 'te' });
      registerComponent.onSubmit();
      expect(registerComponent.error).toEqual("");
    });
    it('should not subscribe with wrong username', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'te', password: 'test' });
      registerComponent.onSubmit();
      expect(registerComponent.error).toEqual("");
    });
    it('should subscribe', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'test', password: 'test' });
      registerComponent.onSubmit();
      expect(registerComponent.error).toEqual("");
    });
    it('should username required', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: '', password: 'te' });
      registerComponent.onSubmit();
      expect(registerComponent.f.username.errors.required).toEqual(true);
    });
    it('should password required', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'te', password: '' });
      registerComponent.onSubmit();
      expect(registerComponent.f.password.errors.required).toEqual(true);
    });
    it('should firstname required', () => {
      registerComponent.registerForm.setValue({firstname: '', lastname: 'voster', username: 'te', password: 'te' });
      registerComponent.onSubmit();
      expect(registerComponent.f.firstname.errors.required).toEqual(true);
    });
    it('should lastname required', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: '', username: 'te', password: 'te'});
      registerComponent.onSubmit();
      expect(registerComponent.f.lastname.errors.required).toEqual(true);
    });
    it('should say that user already use', () => {
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'Ntest', password: 'Ntest'});
      registerComponent.onSubmit();
      console.log(registerComponent.responseDB);
      registerComponent.registerForm.setValue({firstname: 'thomas', lastname: 'voster', username: 'Ntest', password: 'Ntest'});
      registerComponent.onSubmit();
      console.log(registerComponent.responseDB);
      expect(registerComponent.responseDB).toEqual(false);
    });
  });