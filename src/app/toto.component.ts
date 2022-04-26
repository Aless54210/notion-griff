import { Component, Input } from '@angular/core';

@Component({
  selector: 'toto',
  template: `<h2>Hello {{name}}!</h2>`,
  styles: [`h2 { font-family: Lato; }`],
})
export class TotoComponent {
  @Input() name: string;
}
