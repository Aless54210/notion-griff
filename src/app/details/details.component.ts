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
  isEditMode: boolean = false;
  target: any;

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
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => this.note = this.noteService.getNoteById(params['noteId'])
    );
  }

  checkInputValues() {
    this.note.title = (<HTMLInputElement>(document.getElementById('modalTitleInput'))).value;
    this.note.description = (<HTMLInputElement>(document.getElementById('modalDescInput'))).value;
    this.note.assignee = (<HTMLInputElement>(document.getElementById('modalAssigneesInput'))).value;
    if(this.note.priority === 'Low') this.note.priority = 1;
    else if(this.note.priority === 'Medium') this.note.priority = 2;
    else this.note.priority = 3;
    if(this.target) this.note.dueDate = this.target.value;
  }

  updateNote() {
    this.checkInputValues();
    this.noteService.updateNote(this.note);
    this.isEditMode = false;
    window.location.reload();
  }

  deleteNote() {
    this.noteService.deleteNote(this.note.id);
    this.router.navigate(['/']);
  }
}
