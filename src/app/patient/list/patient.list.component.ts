import { Component, OnInit } from '@angular/core';
import { Patient } from '../shared/patient.model';
import { Page } from '../shared/page.model';
import { PatientListService } from './patient.list.service';

@Component({
    selector: 'patient-list',
    templateUrl: './patient.list.component.html',
    styleUrls: ['./patient.list.component.scss'],
    providers: [PatientListService]
})

export class PatientListComponent {
    page = new Page();
    rows = new Array<Patient>();
    searchList = [
        { value: '', viewValue: '-- select --' },
        { value: 'mobileNumber', viewValue: 'Mobile Number' },
        { value: 'gender', viewValue: 'Gender' },
        { value: 'bloodGroup', viewValue: 'Blood Group' },
        { value: 'phoneNumber', viewValue: 'Phone Number' }
    ];
    searchAttribute: string = '';
    searchText: string = '';

    constructor(private patientListService: PatientListService) {
        this.page.size = 8;
    }

    ngOnInit() {
        this.setPage({ offset: 0 });
    }

    setPage(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.patientListService.getPatients(this.page).subscribe(patients => {
            this.rows = patients['docs'];
            this.page.totalElements = patients['total'];
            this.page.totalPages = patients['pages'];
            this.page.size = patients['limit'];
        });
    }

    onSubmit() {
        this.page.query = {};
        if (this.searchText)
            this.page.query[this.searchAttribute] = this.searchText.trim();
        this.setPage({ offset: 0 });
    }
}
