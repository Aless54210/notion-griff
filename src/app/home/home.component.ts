import {Component,Input,OnInit} from '@angular/core';
import {ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {DarkModeService} from 'angular-dark-mode';
import {AuthenticationService} from '../_services';
import {faClose,faCalendar,faUser,faListCheck,faBarsProgress,faMessage,faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  faMessage = faMessage;
  faBarsProgress = faBarsProgress;
  faClose = faClose;
  faCalendar = faCalendar;
  faListCheck = faListCheck;
  faPerson = faUser;
  faSearch = faSearch;
  loading = false;
  // theme variable
  isDarkMode: Boolean;
  isModalOpened = false;

  constructor(
    private elementRef: ElementRef,
    public darkModeService: DarkModeService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
    if(!this.authenticationService.authenticated)
      router.navigate(['/login']);
  }

  async ngOnInit() {
  }

  public get getModalOpened() {
    return this.isModalOpened;
  }

  getClass() {
    return this.isDarkMode ? 'dark-mode' : 'light-mode';
  }

  public changeModal() {
    this.isModalOpened = !this.isModalOpened;
  }

  public getClassModal() {
    return this.isModalOpened ? 'show' : '';
  }
}

