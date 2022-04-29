import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface NoteT {
    title: string;
    description: string;
    assigneesId: Array<number>;
    priority: number;
};

@Injectable({ providedIn: 'root' })
export class NoteService {
    notes: Array<NoteT> = [];

    constructor() { }

    public async loadNotes() {
        const noteRes = await fetch(`http://localhost:8080/api/notes`, {});
        if (!noteRes.ok)
            return;
        const noteJson = await noteRes.json();
        noteJson.data.forEach((note: { title: string; description: string; assigneesId: string; priority: number; }) => {
            this.notes.push({
                title: note.title,
                description: note.description,
                assigneesId: note.assigneesId.split(',').map(Number),
                priority: note.priority,
            } as NoteT);
        });
    }

    public async deleteNote() {

    }

    public async getNote(noteId: number) {
        const noteRes = await fetch(`http://localhost:8080/api/notes/${noteId}`, {});
        if (!noteRes.ok)
            return null;
        const noteJson = await noteRes.json();
        const objNote = {
            title: noteJson.data.title,
            description: noteJson.data.description,
            assigneesId: noteJson.data.assigneesId.split(',').map(Number),
            priority: noteJson.data.priority,
        } as NoteT;
        return objNote;
    }
}