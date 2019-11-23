import { Component, OnInit } from "@angular/core";
import { Note } from "./note";
import { NotesService } from "./notes.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  errMessage: string;
  note = new Note();
  title = "";
  text = "";
  showUpdateButton = false;
  editNoteId: number = 0;

  constructor(private notesService: NotesService) {}

  notesArray: Array<Note> = [];

  ngOnInit() {
    this.fetchNotes();
  }

  addNote() {
    if (this.title !== "" && this.text !== "") {
      this.note.title = this.title;
      this.note.text = this.text;
      this.title = "";
      this.text = "";

      this.notesService.addNote(this.note).subscribe(
        data => this.notesArray.push(data),
        error => (this.errMessage = error.message)
      );
    } else {
      this.errMessage = "Title and Text both are required fields";
    }
  }
  onEdit(id: number) {
    this.editNoteId = id;
    this.notesService.getNote(id).subscribe(
      data => {
        this.note = data;
        this.text = data.text;
        this.title = data.title;
      },
      error => (this.errMessage = error.message)
    );
    this.showUpdateButton = !this.showUpdateButton;
  }

  fetchNotes() {
    this.notesService.getNotes().subscribe(
      data => (this.notesArray = data),
      error => (this.errMessage = error.message)
    );
    this.errMessage = "";
  }

  updateNote() {
    this.note.title = this.title;
    this.note.text = this.text;
    this.notesService.updateNote(this.note, this.editNoteId).subscribe(
      data => this.fetchNotes(),
      error => (this.errMessage = error.message)
    );
    this.resetInput();
  }

  onDelete(id: number) {
    this.notesService.deleteNote(id).subscribe(
      data => this.fetchNotes(),
      error => (this.errMessage = error.message)
    );
  }

  resetInput() {
    this.title = "";
    this.text = "";
    this.showUpdateButton = !this.showUpdateButton;
  }

  dismissError() {
    this.errMessage = "";
  }
}
