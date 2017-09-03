import { Component, OnInit } from '@angular/core';

import { Checkup } from '../shared/checkup.model';
import { PatientCheckupComponentService } from './patient.checkup.service';

@Component({
    selector: 'patient-checkup',
    templateUrl: './patient.checkup.component.html',
    styleUrls: ['./patient.checkup.component.scss'],
    providers: [PatientCheckupComponentService]
})

export class PatientCheckupComponent {
    checkup : Checkup; 
    doctorList = [{ viewValue: '-- select --', value: '' }, { viewValue: 'karthick', value: 'karthick' }]

    constructor(private patientCheckupComponentService: PatientCheckupComponentService) {

    }

    ngOnInit() {
        this.checkup = this.patientCheckupComponentService.sampleCheckup();
    }
}