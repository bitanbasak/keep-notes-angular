import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Note } from './note';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotesService {
  error = new Subject<string>();
  constructor(private httpClient: HttpClient) {}

  getNotes(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>('http://localhost:3000/notes');
  }

  addNote(note: Note): Observable<Note> {
    return this.httpClient.post<Note>('http://localhost:3000/notes', note);
  }

  getNote(id: number): Observable<Note> {
    return this.httpClient.get<Note>(`http://localhost:3000/notes/${id}`);
  }

  updateNote(note: Note, id: number): Observable<Note> {
    return this.httpClient.put<Note>(`http://localhost:3000/notes/${id}`, note);
  }

  deleteNote(id: number): Observable<Note> {
    return this.httpClient.delete<Note>(`http://localhost:3000/notes/${id}`);
  }
}
