/**
 * Created by martin on 24.12.15.
 */

import {Component} from 'angular2/core'

@Component({
    selector: 'userprofile',
    inputs: ['bio'],
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
            <h3> User Info </h3>
            <div class="panel panel-default">
                <div class="panel-body">
                    <img *ngIf="bio.avatar_url" [src]="bio.avatar_url" class="img-rounded img-responsive"/>
                    <table class="table">
                        <tr *ngIf="bio.name"><td><strong>Name:</strong></td><td> {{bio.name}}</td></tr>
                        <tr *ngIf="bio.login"><td><strong>Username:</strong></td><td>{{bio.login}}</td></tr>
                        <tr *ngIf="bio.email"><td><strong>Email:</strong></td><td><a href="mailto:{{bio.email}}">{{bio.email}}</a></td></tr>
                        <tr *ngIf="bio.location"><td><strong>Location:</strong></td><td>{{bio.location}}</td></tr>
                        <tr *ngIf="bio.company"><td><strong>Company:</strong></td><td>{{bio.company}}</td></tr>
                        <tr *ngIf="bio.followers"><td><strong>Followers:</strong></td><td>{{bio.followers}}</td></tr>
                        <tr *ngIf="bio.following"><td><strong>Following:</strong></td><td>{{bio.following}}</tr>
                        <tr *ngIf="bio.public_repos"><td><strong>Public Repos:</strong></td><td>{{bio.public_repos}}</td></tr>
                        <tr *ngIf="bio.blog"><td><strong>Blog:</strong></td><td><a [href]='bio.blog'>{{bio.blog}}</a></td></tr>
                    </table>
                </div>
            </div>
      </div>
    `,
    // styleUrls: [],
    // styles: [],
    // directives: [],
    // pipes: [],
    // encapsulation: ViewEncapsulation.Emulated
})
export class Userprofile {
    bio : any;
}