import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Patient } from '../shared/patient.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class PatientDetailsService {

    constructor(private http: HttpClient) {

    }

    samplePatient() {
        let patient = {
            _id: '',
            name: {
                first: '',
                middle: '',
                last: ''
            },
            dob: '',
            gender: '',
            address: {
                address1: '',
                address2: '',
                city: '',
                state: '',
                pincode: '',
            },
            mobileNumber: '',
            phoneNumber: '',
            bloodGroup: '',
            status: true
        };
        return patient;
    }

    getPatientDetails(id: string): Observable<Patient> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getPatientDetails/' + id)
            .map((res) => res.json());
    }

    createPatientDetails(patient: Patient): Observable<Patient> {
        return this.http.post(AppSettings.API_ENDPOINT + '/createPatientDetails', patient)
            .map((res) => res.json());
    }

    updatePatientDetails(patient: Patient): Observable<Patient> {
        return this.http.put(AppSettings.API_ENDPOINT + '/updatePatientDetails/' + patient._id, patient)
            .map((res) => res.json());
    }

    deletePatient(id: string) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/deletePatient/' + id)
            .map((res) => res.json());
    }
}