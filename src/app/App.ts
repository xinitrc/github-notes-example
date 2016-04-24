import {Component, provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {
    APP_BASE_HREF,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    ROUTER_PRIMARY_COMPONENT,
    HashLocationStrategy,
    LocationStrategy,
    Router,
    RouteConfig,
    RouteParams,
} from "angular2/router";
import {Home} from './Home';
import {Profile} from './Profile';
import {Searchbar} from './Searchbar';
import {GithubInfoService} from "./GithubInfoService";
import {NotesService} from './NotesService';
import {HTTP_PROVIDERS} from "angular2/http";

@RouteConfig([
    { path: '/', name: 'Home', component: Home},
    { path: '/profile/:username', name: 'Profile', component: Profile}
])
@Component({
    selector: 'app',
    template: `
        <div class="main-container">
            <nav class="navbar navbar-default">
                <div class="container">
                <div class="row">
                    <div class="navbar-header">
                        <searchbar (search)="search($event)"></searchbar>
                    </div>
                </div>
                </div>
            </nav>
            <div class="container">
            <div class="row">
                <router-outlet></router-outlet>
            </div>

        </div>
    `,
    directives: [Searchbar, ROUTER_DIRECTIVES],
})
export class App{
    constructor(private router : Router) {}

    search(username : string) {
        if (username === "") {
            this.router.navigate(['Home']);
        } else {
            this.router.navigate(['Profile', {username: username}]);
        }
    }
}

bootstrap(App, [
    GithubInfoService,
    NotesService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    provide(ROUTER_PRIMARY_COMPONENT, {useValue: App}),
    provide(APP_BASE_HREF, {useValue: '/'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy})]);