import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Checkup } from '../shared/checkup.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class PatientCheckupComponentService {

    constructor(private http: HttpClient) {
    }

    sampleCheckup() {
        let checkup = {
            _id: '',
            patientId: '',
            doctorName: '',
            checkupDate: new Date(),
            diagnosis: '',
            symptoms: '',
            prescription: <any>[],
            extraNotes: ''
        };
        return checkup;
    }

    createCheckupDetails(checkup: Checkup): Observable<Checkup> {
        return this.http.post(AppSettings.API_ENDPOINT + '/createCheckupDetails', checkup)
            .map((res) => res.json());
    }

    updatePatientDetails(checkup: Checkup): Observable<Checkup> {
        return this.http.put(AppSettings.API_ENDPOINT + '/updateCheckupDetails/' + checkup._id, checkup)
            .map((res) => res.json());
    }

    getCheckupDetails(id: string): Observable<Checkup> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getCheckupDetails/' + id)
            .map((res) => res.json());
    }

    getDoctorsName(): Observable<any> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getDoctorsName/')
            .map((res) => res.json());
    }

}
