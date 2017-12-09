import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Doctor } from './../shared/doctor.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class DoctorDetailsService {

    constructor(private http: HttpClient) {
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

    getAllDoctors(): Observable<Doctor> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getAllDoctors/')
            .map((res) => res.json());
    }

    getDoctorDetails(id: string): Observable<Doctor> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getDoctorDetails/' + id)
            .map((res) => res.json());
    }

    createDoctorDetails(doctor: Doctor): Observable<Doctor> {
        return this.http.post(AppSettings.API_ENDPOINT + '/createDoctorDetails', doctor)
            .map((res) => res.json()).catch((err: Response) => {
                return Observable.throw(err.json().error);
            });
    }

    updateDoctorDetails(doctor: Doctor): Observable<Doctor> {
        return this.http.put(AppSettings.API_ENDPOINT + '/updateDoctorDetails/' + doctor._id, doctor)
            .map((res) => res.json()).catch((err: Response) => {
                return Observable.throw(err.json().error);
            });
    }

    deleteDoctor(id: string) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/deleteDoctor/' + id)
            .map((res) => res.json());
    }
}