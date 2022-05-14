import {Injectable} from '@angular/core';
import {BehaviorSubject,Observable} from 'rxjs';
import {DatePipe} from "@angular/common";
import {environment} from "../../environment/environment";

interface NoteT {
    id: number;
    title: string;
    description: string;
    assignee: string[];
    priority: number;
    status: string;
    dueDate: string;
};

@Injectable({providedIn: 'root'})
export class NoteService {
    notes: Array<NoteT> = [];

    constructor() {}

    private clearArray = () => {while(this.notes.length > 0) this.notes.pop()}

    public async loadNotes() {
        const datepipe = new DatePipe('en-US');
        const noteRes = await fetch(`${environment.URL_API}/api/notes`,{});
        if(!noteRes.ok)
            return;
        const noteJson = await noteRes.json();
        this.clearArray();
        noteJson.data.forEach(note => {
            this.notes.push({
                id: note.id,
                title: note.title,
                description: note.description,
                assignee: note.assigneesId.slice(0,-1).split(";"),
                priority: note.priority,
                status: note.status,
                dueDate: datepipe.transform(note.dueDate,'dd-MM-YYYY HH:mm')
            } as NoteT);
        });
    }

    public async deleteNote(noteId: number) {
        await fetch(`${environment.URL_API}/api/notes/${noteId}`,{
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`}
        }).catch(err => {console.error(err.message)})
    }

    public getNotes(): Array<NoteT> | null {
        return this.notes;
    }

    public getNote(noteId: number): NoteT | null {
        let res = null;
        this.notes.forEach(note => {
            if(noteId === note.id)
                res = note;
        })
        return res;
    }

    public async updateNote(updatedPost: NoteT) {
        await fetch(`${environment.URL_API}/api/notes`,{
            method: 'PUT',
            headers: {'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,"Content-type": "application/json"},
            body: JSON.stringify({
                id: updatedPost.id,
                title: updatedPost.title,
                description: updatedPost.description,
                priority: updatedPost.priority,
                status: updatedPost.status,
                dueDate: updatedPost.dueDate,
                assignees: updatedPost.assignee
            })
        }).catch(err => {console.error(err.message)})
    }

    public async createNote(title,desc,priority,status,dueDate,assignees) {
        await fetch(`${environment.URL_API}/api/notes`,{
            method: 'POST',
            headers: {"Authorization": `Bearer ${localStorage.getItem("accessToken")}`,"Content-type": "application/json"},
            body: JSON.stringify({
                title: title,
                description: desc,
                priority: priority,
                status: status,
                dueDate: dueDate,
                assignees: assignees
            })
        }).catch(err => {console.error(err.message)})
    }

    public getNoteById(noteId): NoteT | null {
        return this.notes.filter(note => note.id == noteId)[0];
    }
}