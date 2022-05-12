import {Component,Input,OnInit} from '@angular/core';
import {ElementRef} from '@angular/core';
import {Router} from '@angular/router';
import {DarkModeService} from 'angular-dark-mode';
import {AuthenticationService,NoteService} from '../_services';
import {faClose,faCalendar,faUser,faListCheck,faBarsProgress,faMessage,faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // inputs
  _title: string;
  _description: string;
  _priority: number = 1;
  _status: string = "To do";
  _assignees: string;
  _dueDate: string = "";
  // icons
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
  notes = []
  target: any;
  searchText: string;

  constructor(
    private elementRef: ElementRef,
    public darkModeService: DarkModeService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private noteService: NoteService
  ) {
    this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
    if(!this.authenticationService.authenticated)
      router.navigate(['/login']);
  }

  ngOnInit() {
    this.loadAndGetNotes();
  }

  async loadAndGetNotes() {
    await this.noteService.loadNotes();
    this.notes = this.noteService.getNotes();
    this.notes.forEach(note => {
      if(note.assignee[0].length <= 0) note.assignee = [];
      if(note.priority === 1) note.priority = 'Low';
      else if(note.priority === 2) note.priority = "Medium";
      else note.priority = "High";
    });
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

  createNote() {
    this._title = (<HTMLInputElement>document.getElementById("modalTitleInput")).value;
    this._description = (<HTMLInputElement>document.getElementById("modalDescInput")).value;
    this._assignees = (<HTMLInputElement>document.getElementById("modalAssigneesInput")).value;
    if(this.target) this._dueDate = this.target.value;
    this.noteService.createNote(this._title,this._description,this._priority,this._status,this._dueDate,this._assignees);
    this.changeModal();
    window.location.reload();
  }

  goToDetails(note) {
    this.router.navigate(['/details'],{queryParams: {noteId: `${note.id}`}});
  }
}

