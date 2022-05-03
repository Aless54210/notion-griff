import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';

interface NoteT {
    id: number;
    title: string;
    description: string;
    assigneesId: Array<number>;
    priority: number;
};

@Injectable({providedIn: 'root'})
export class NoteService {
    notes: Array<NoteT> = [];

    constructor() {}

    private clearArray = () => {while(this.notes.length > 0) this.notes.pop()}

    public async loadNotes() {
        const noteRes = await fetch(`http://localhost:8080/api/notes`,{});
        if(!noteRes.ok)
            return;
        const noteJson = await noteRes.json();
        this.clearArray();
        noteJson.data.forEach((note: {id: number; title: any; description: any; assigneesId: string; priority: any;}) => {
            this.notes.push({
                id: note.id,
                title: note.title,
                description: note.description,
                assigneesId: note.assigneesId.split(',').map(Number),
                priority: note.priority,
            } as NoteT);
        });
    }

    public async deleteNote(noteId: number) {
        await fetch(`http://localhost:8080/api/notes/${noteId}`,{
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        }).catch(err => {console.error(err.message)})
    }

    public getNote(noteId: number): NoteT | null {
        let res = null;
        this.notes.forEach(note => {
            if(noteId === note.id)
                res = note;
        })
        return res;
        //const noteRes = await fetch(`http://localhost:8080/api/notes/${noteId}`,{});
        //if(!noteRes.ok)
        //    return null;
        //const noteJson = await noteRes.json();
        //const objNote = {
        //    title: noteJson.data.title,
        //    description: noteJson.data.description,
        //    assigneesId: noteJson.data.assigneesId.split(',').map(Number),
        //    priority: noteJson.data.priority,
        //} as NoteT;
        //return objNote;
    }

    public async updateNote(updatedPost: NoteT) {
        await fetch(`http://localhost:8080/api/notes`,{
            method: 'PATCH',
            headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`},
            body: JSON.stringify(updatedPost)
        }).catch(err => {console.error(err.message)})
    }

    public async createNote(newNote: NoteT) {
        await fetch(`http://localhost:8080/api/notes`,{
            method: 'POST',
            headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`},
            body: JSON.stringify(newNote)
        }).catch(err => {console.error(err.message)})
    }
}