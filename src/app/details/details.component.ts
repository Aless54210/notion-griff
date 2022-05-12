import {Component,OnInit} from '@angular/core';
import {ElementRef} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {DarkModeService} from 'angular-dark-mode';
import {AuthenticationService,NoteService} from '../_services';
import {
  faClose,
  faCalendar,
  faUser,
  faListCheck,
  faBarsProgress,
  faMessage,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  faMessage = faMessage;
  faBarsProgress = faBarsProgress;
  faClose = faClose;
  faCalendar = faCalendar;
  faListCheck = faListCheck;
  faPerson = faUser;
  faSearch = faSearch;
  loading = false;
  isDarkMode: boolean;
  note: any;

  constructor(
    private elementRef: ElementRef,
    public darkModeService: DarkModeService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {
    this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
    if(!this.authenticationService.authenticated)
      router.navigate(['/login']);
    this.noteService.loadNotes();
    route.queryParams.subscribe(
      params => this.note = this.noteService.getNoteById(params['noteId'])
    );
    console.log(this.note);
  }

  ngOnInit() {
  }

  editNote(){
  }

  deleteNote(){
  }
}
