import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { AppSettings } from './../app.settings';

@Injectable()
export class LoginService {

    constructor(private http: Http) {
    }

    signIn(user: any): Observable<any> {
        return this.http.post(AppSettings.API_ENDPOINT_AUTH + '/authenticate', user)
            .map((res) => res.json());
    }

    getHeader() {
        let header = {};
        if(sessionStorage.getItem('currentUser')) {
            
        }
    }
}