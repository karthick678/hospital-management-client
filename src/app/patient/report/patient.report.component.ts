import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from "rxjs";

import { Patient } from './../shared/patient.model';
import { Checkup } from './../shared/checkup.model';
import { Page } from '../shared/page.model';

import { PatientDetailsService } from './../details/patient.details.service';
import { PatientReportService } from './patient.report.service';

@Component({
    selector: 'report',
    templateUrl: './patient.report.component.html',
    providers: [PatientDetailsService, PatientReportService]
})

export class PatientReportComponent {
    id: string;
    patientId: string;
    patientName: string;
    patient: Patient;
    page = new Page();
    checkup = new Array<Checkup>();
    constructor(private patientDetailsService: PatientDetailsService, private patientReportService: PatientReportService, private router: ActivatedRoute) {
        this.page.size = 8;
    }

    ngOnInit() {
        this.id = this.router.snapshot.params['id'];
        this.patientId = this.id;
        this.getCheckups({ offset: 0 });
        this.getPatientDetails();
    }

    getPatientDetails() {
        this.patient = this.patientDetailsService.samplePatient();
        this.patientDetailsService.getPatientDetails(this.patientId).subscribe(patient => {
            this.patient = patient;
            this.patientName = this.patient.name.first + ' ' + this.patient.name.middle + ' ' + this.patient.name.last;
        });
    }

    getCheckups(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.page.query = {
            patientId: this.patientId
        };
        this.patientReportService.getCheckups(this.page).subscribe(checkups => {
            this.checkup = checkups['docs'];
            this.page.totalElements = checkups['total'];
            this.page.totalPages = checkups['pages'];
            this.page.size = checkups['limit'];
        });
    }

    deleteCheckup(row: Checkup) {
        let index = this.checkup.indexOf(row);
        if (index !== -1) {
            this.patientReportService.deleteCheckup(row._id).subscribe(checkup => {
                this.getCheckups({ offset: 0 });
                this.checkup.splice(index, 1);
            });
        }
    }
}