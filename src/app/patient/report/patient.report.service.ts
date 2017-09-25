import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { AppSettings } from '../../app.settings';
import { Page } from '../shared/page.model';
import { Checkup } from '../shared/checkup.model';

@Injectable()
export class PatientReportService {
    constructor(private http: HttpClient) {
    }

    sampleCheckup() {
        let checkup = [{
            _id: '',
            patientId: '',
            doctorName: '',
            symptoms: '',
            diagnosis: '',
            checkupDate: '',
            prescription: [{
                medicine: '',
                noOfDays: 0,
                whenToTake: '',
                beforeMeal: false
            }],
            extraNotes: ''
        }];
        return checkup;
    }

    getCheckups(page: Page): Observable<Checkup[]> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getCheckups', {
            page: page.pageNumber,
            limit: page.size,
            query: page.query
        })
            .map((res) => res.json());
    }

    deleteCheckup(id: string) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/deleteCheckup/' + id)
            .map((res) => res.json());
    }
}
