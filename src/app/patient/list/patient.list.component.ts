import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Page } from '../shared/page.model';
import { PatientListService } from './patient.list.service';

@Component({
    selector: 'patient-list',
    templateUrl: './patient.list.component.html',
    providers: [PatientListService]
})

export class PatientListComponent {
    page = new Page();
    rows = new Array<Patient>();

    constructor(private patientListService: PatientListService) {
        this.page.pageNumber = 0;
    }

    ngOnInit() {
        this.setPage();
    }

    setPage() {
        this.rows = this.patientListService.getPatients();
        this.page = { size:3, totalElements: 10, totalPages:6, pageNumber:1 };
    }
}
