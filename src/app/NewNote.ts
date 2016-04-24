/**
 * Created by martin on 25.12.15.
 */

import {Component, EventEmitter} from 'angular2/core'
import {NotesService} from "./NotesService";

@Component({
    selector: 'newnote',
    inputs: ['username'],
    outputs: ['notesUpdate'],
    // host: {},
    // providers: [],
    // exportAs: [],
    // moduleId: [],
    // viewProviders: [],
    // queries: {},
    // changeDetection: ChangeDetectionStrategy.Default,
    // templateUrl: ''
    template: `
        <form class="input-group" (submit)="submitHandler(note.value)">
            <input type="text" class="form-control" placeholder="Add New Note" #note [(ngModel)]="noteText" />
            <span class='input-group-btn'>
                <button class="btn btn-default" type="submit" >Add note</button>
            </span>
        </form>
    `,
    // styleUrls: [],
    // styles: [],
    // directives: [],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class NewNote {
    username : string;
    noteText : string;
    notesUpdate : EventEmitter<string> = new EventEmitter<string>();

    constructor(private notesService : NotesService) {}

    submitHandler(note : string) {
        this.noteText = "";

        if (note !== "") {
            this.notesService.addNoteForUser(this.username, note);
        }

        this.notesUpdate.next('foo');
    }
}