/**
 * Created by martin on 24.12.15.
 */

import {Component, EventEmitter} from 'angular2/core'

@Component({
    selector: 'searchbar',
    // inputs: [],
    outputs: ['search'],
    // host: {},
    // providers: [],
    // exportAs: [],
    // moduleId: [],
    // viewProviders: [],
    // queries: {},
    // changeDetection: ChangeDetectionStrategy.Default,
    // templateUrl: ''
    template: `
            <form class="navbar-form form-inline" role="search" (submit)="submitHandler(username.value)">
                <div class="form-group">
                    <input type="text" class="lowercase form-control" placeholder="github username" #username [(ngModel)]="toSearch" >
                </div>
                <button type="submit" class="btn btn-primary">Search Githubber</button>
            </form>
    `,
    // styleUrls: [],
    styles: [
        `.lowercase {
            text-transform: lowercase;
         }`
    ],
    // directives: [],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class Searchbar {
    search : EventEmitter<string> = new EventEmitter<string>();
    toSearch : string;

    submitHandler(username : string) {
        this.toSearch = "";
        this.search.next(username.toLocaleLowerCase());
    }

}