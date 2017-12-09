import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Page } from '../shared/page.model';
import { Patient } from '../shared/patient.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class PatientListService {
    constructor(private http: HttpClient) {

    }
    getPatients(page: Page): Observable<Patient[]> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getPatients', {
            page: page.pageNumber,
            limit: page.size,
            query: page.query
        })
        .map((res) => res.json());
    }
}