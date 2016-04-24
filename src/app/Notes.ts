/**
 * Created by martin on 24.12.15.
 */

import {Component, EventEmitter} from 'angular2/core'
import {NewNote} from "./NewNote";
import {Note} from './Note';

@Component({
    selector: 'notes',
    inputs: ['username', 'notes'],
    //outputs: ['notesUpdate'],
    // host: {},
    // providers: [],
    // exportAs: [],
    // moduleId: [],
    // viewProviders: [],
    // queries: {},
    // changeDetection: ChangeDetectionStrategy.Default,
    // templateUrl: ''
    template: `
    <div>
        <h3>Notes for {{username}}</h3>
        <newnote [username]="username"></newnote>
        <ul class="list-group">
            <note *ngFor="#note of notes" [note]="note"></note>
        </ul>
    </div>
    `,
    // styleUrls: [],
    // styles: [],
    directives: [NewNote, Note],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class Notes {
    username : string;
    notes : Array<any> = [];
}