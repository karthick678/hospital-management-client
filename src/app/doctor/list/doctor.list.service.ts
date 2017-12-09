import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Page } from './../../patient/shared/page.model';
import { Doctor } from './../shared/doctor.model';
import { AppSettings } from '../../app.settings';
import { HttpClient } from './../../guard/http.client';

@Injectable()
export class DoctorListService {
    constructor(private http: HttpClient) {
        
    }
    getDoctors(page: Page): Observable<Doctor[]> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getDoctors', {
            page: page.pageNumber,
            limit: page.size,
            query: page.query
        })
        .map((res) => res.json());
    }
}