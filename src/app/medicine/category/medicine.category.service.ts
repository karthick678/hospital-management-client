import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { AppSettings } from '../../app.settings';

@Injectable()
export class MedicineCategoryComponentService {

    constructor(private http: HttpClient) {
    }

    getAllCategories(searchQuery: any): Observable<any> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getAllCategories', searchQuery)
            .map((res) => res.json());
    }
}
