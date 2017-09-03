import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Checkup, Prescription } from '../shared/checkup.model';
import { AppSettings } from '../../app.settings';

@Injectable()
export class PatientCheckupComponentService {

    constructor(private http: Http) {

    }

    sampleCheckup() {
        let checkup = {
            _id: '',
            doctorName: '',
            checkupDate: '',
            diagnosis: '',
            symptoms: '',
            prescription: [{
                medication: '',
                noOfDays: '',
                whenToTake: '',
                beforeMeal: ''
            }]
        };
        return checkup;
    }
}