import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Inject} from "angular2/core";


@Injectable()
export class GithubInfoService {
    private http;

    constructor(http : Http) {
        this.http = http;
    }

    fetchUserInfo(username : string) {
        return this.http.get(`https://api.github.com/users/${username}`);
    }

    fetchUserRepos(username : string) {
        return this.http.get(`https://api.github.com/users/${username}/repos`);
    }
}