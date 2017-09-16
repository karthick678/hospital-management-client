import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Doctor } from './../shared/doctor.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class DoctorDetailsService {

    constructor(private http: Http) {
    }

    sampleDoctor() {
        let doctor = {
            _id: '',
            name: {
                first: '',
                middle: '',
                last: ''
            },
            email: '',
            gender: '',
            mobileNumber: '',
            phoneNumber: '',
            status: true
        };
        return doctor;
    }

    getDoctorDetails(id: string): Observable<Doctor> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getDoctorDetails/' + id)
            .map((res) => res.json());
    }

    createDoctorDetails(doctor: Doctor): Observable<Doctor> {
        return this.http.post(AppSettings.API_ENDPOINT + '/createDoctorDetails', doctor)
            .map((res) => res.json());
    }

    updateDoctorDetails(doctor: Doctor): Observable<Doctor> {
        return this.http.put(AppSettings.API_ENDPOINT + '/updateDoctorDetails/' + doctor._id, doctor)
            .map((res) => res.json());
    }

    deleteDoctor(id: string) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/doctorDoctor/' + id)
            .map((res) => res.json());
    }
}