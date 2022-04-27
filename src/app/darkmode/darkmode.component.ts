import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: 'darkmode.component.html',
  styleUrls: ['./darkmode.component.css']
})
export class DarkmodeComponent implements OnInit {
  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  isDarkMode: Boolean;
  private lightColor = "#fff";
  private darkColor = "#333";
  private lightNavColor = "#dfe6e9";
  private darkNavColor = "#2d3436";
  private darkNavHeader = "#343a40";

  constructor(private darkModeService: DarkModeService) { }

  ngOnInit() {
    this.checkValue();
  }

  onToggle(): void {
    this.darkModeService.toggle();
    this.checkValue();
  }

  checkValue() {
    this.darkModeService.darkMode$.subscribe(x => this.isDarkMode = x);
    if (!this.isDarkMode) {
      document.documentElement.style.setProperty('--primary-color', this.lightColor);
      document.documentElement.style.setProperty('--primary-opp-color', this.darkColor);
      document.documentElement.style.setProperty('--secondary-color', this.lightNavColor);
      document.documentElement.style.setProperty('--secondary-opp-color', this.darkNavColor);
      document.documentElement.style.setProperty('--third-color', this.lightColor);
      document.documentElement.style.setProperty('--third-opp-color', this.darkNavHeader);
    } else {
      document.documentElement.style.setProperty('--primary-color', this.darkColor);
      document.documentElement.style.setProperty('--primary-opp-color', this.lightColor);
      document.documentElement.style.setProperty('--secondary-color', this.darkNavColor);
      document.documentElement.style.setProperty('--secondary-opp-color', this.lightNavColor);
      document.documentElement.style.setProperty('--third-color', this.darkNavHeader);
      document.documentElement.style.setProperty('--third-opp-color', this.lightColor);
    }
  }
}