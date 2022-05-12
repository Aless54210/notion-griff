import {Pipe,PipeTransform} from '@angular/core';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(notes: any[],searchText: string) {
    if(notes.length === 0 || !searchText || searchText.length === 0)
      return notes;

    return notes.filter(note =>
      note.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      note.description.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
      note.assignee.toString().toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
  }

}
