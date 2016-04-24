/**
 * Created by martin on 24.12.15.
 */

import {Component} from 'angular2/core'

@Component({
    selector: 'repos',
    inputs: ['username', 'repos'],
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
    <div>
        <h3> User Repos </h3>
        <ul class="list-group">
            <li *ngFor="#repo of repos" class="list-group-item">
                <h4 *ngIf="repo.html_url" class="list-group-item-heading"><a [href]="repo.html_url">{{repo.name}}</a></h4>
                <p *ngIf="repo.description" class="list-group-item-text">{{repo.description}}</p>
            </li>
        </ul>
      </div>
    `,
    // styleUrls: [],
    // styles: [],
    // directives: [],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class Repos {
    repos : Array<any>;
}