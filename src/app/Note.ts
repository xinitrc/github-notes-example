/**
 * Created by martin on 26.12.15.
 */

import {Component} from 'angular2/core'
import {NotesService} from "./NotesService";

@Component({
    selector: 'note',
    inputs: ['note'],
    // outputs: [],
    // host: {},
    // providers: [],
    // exportAs: [],
    // moduleId: [],
    // viewProviders: [],
    // queries: {},
    // changeDetection: ChangeDetectionStrategy.Default,
    // templateUrl: ''
    template: `
        <li class="list-group-item" *ngIf="!editmode" (doubleclick)="editmode = true;" (dblclick)="editmode = true;">
            <span class="text">{{note.note}}</span><!--
         --><button type="button" class="close" (click)="remove()" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        </li>
        <li *ngIf="editmode" class="list-group-item">
            <form class="input-group" (submit)="submitHandler(noteInput.value)" (keyup.esc)="editmode = false">
                <input type="text" class="form-control" #noteInput [value]="note.note" />
                <span class='input-group-btn'>
                    <button class="btn btn-default" type="button" (click)="editmode = false">Cancel</button>
                    <button class="btn btn-default" type="submit" >Update</button>
                </span>
            </form>
        </li>

    `,
    // styleUrls: [],
    // styles: [],
    // directives: [],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class Note {
    note : any;
    editmode: boolean = false;

    constructor(private notesService : NotesService) {}

    remove() {
        this.notesService.removeNote(this.note);
    }

    submitHandler(value) {
        this.note.note = value;

        this.notesService.editNote(this.note);

        this.editmode = false;
    }
}