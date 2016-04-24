/**
 * Created by martin on 24.12.15.
 */

import {Component} from 'angular2/core'
import {RouteParams} from "angular2/router";
import {CanReuse} from "angular2/router";
import {OnReuse} from "angular2/router";
import {ComponentInstruction} from "angular2/router";
import {GithubInfoService} from "./GithubInfoService";
import {Userprofile} from "./Userprofile";
import {Repos} from "./Repos";
import {Notes} from "./Notes";
import {OnInit} from "angular2/core";
import {NotesService} from "./NotesService";
import {NgZone} from "angular2/core";

@Component({
    selector: 'profile',
    // inputs: [],
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
        <div class="col-md-4">
            <userprofile [bio]="bio"></userprofile>
        </div>
        <div class="col-md-4">
           <repos [repos]="repos"></repos>
        </div>
        <div class="col-md-4">
            <notes [username]="username" [notes]="notes">Foo</notes>
        </div>
    `,
    // styleUrls: [],
    // styles: [],
    directives: [Userprofile, Repos, Notes],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class Profile implements CanReuse, OnInit {
    private bio : any = {};
    private repos : Array<any> = [];
    private notes : Array<any> = [];
    private username : string = "";

    constructor(rp : RouteParams, private githubInfoService : GithubInfoService, private notesService : NotesService, private _ngZone : NgZone) {
        this.username = rp.get('username');
    }

    ngOnInit():any {
        this.githubInfoService.fetchUserInfo(this.username).subscribe(response => this.bio = response.json());
        this.githubInfoService.fetchUserRepos(this.username).subscribe(response => this.repos = response.json());
        this.notesService.getNotesforUser(this.username).then(result => this.notes = result);
        this.notesService.getUserNotesstream(this.username)
            .subscribe(doc => { if(doc._rev.startsWith("1-")) { this.addNote(doc) } else { this.editNote(doc); } });
        this.notesService.getRemoveStream()
            .subscribe(doc => { this.removeNote(doc); });
    }

    routerCanReuse(nextInstruction:ComponentInstruction, prevInstruction:ComponentInstruction):any {
        return false;
    }

    addNote(note : any) {
        this.notes.push(note);
    }

    editNote(newNote : any) {
        const idx = this.notes.map(note => { return note._id; } ).indexOf(newNote._id);

        if (idx >= 0) {
            this.notes[idx] = newNote;
        }
    }

    removeNote(docID) {
        this.notes = this.notes.filter( note => { return note._id !== docID });
    }
}