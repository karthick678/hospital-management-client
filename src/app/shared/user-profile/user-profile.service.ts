import { Injectable, OnInit } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { AppSettings } from '../../app.settings';

@Injectable()
export class UserDetailsService {

    constructor(private http: HttpClient) {
    }

    getUserDetails(id: string): Observable<any> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getUserDetails/' + id)
            .map((res) => res.json());
    }
}