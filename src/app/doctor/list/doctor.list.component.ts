import { Component, OnInit } from '@angular/core';

import { Page } from './../../patient/shared/page.model';
import { Doctor } from './../shared/doctor.model';
import { SharedService } from './../../shared/shared.service';
import { DoctorListService } from './doctor.list.service';

@Component({
    selector: 'doctor-list',
    templateUrl: './doctor.list.component.html',
    styleUrls: ['./doctor.list.component.scss'],
    providers: [SharedService, DoctorListService]
})

export class DoctorListComponent {
    page = new Page();
    rows = new Array<Doctor>();
    pageSizeList: any = [];
    searchList = [
        { value: '', viewValue: '-- select --' },
        { value: 'email', viewValue: 'Email' },
        { value: 'mobileNumber', viewValue: 'Mobile Number' },
        { value: 'gender', viewValue: 'Gender' },
        { value: 'phoneNumber', viewValue: 'Phone Number' }
    ];
    searchAttribute: string = '';
    searchText: string = '';

    constructor(private sharedService: SharedService, private doctorListService: DoctorListService) {
        this.pageSizeList = sharedService.getPageSizeList();
        this.page.size = 8;
    }

    ngOnInit() {
        this.setPage({ offset: 0 });
    }

    setPage(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.doctorListService.getDoctors(this.page).subscribe(doctors => {
            this.rows = doctors['docs'];
            this.page.totalElements = doctors['total'];
            this.page.totalPages = doctors['pages'];
            this.page.size = doctors['limit'];
        });
    }

    onSubmit() {
        this.page.query = {};
        if (this.searchText)
            this.page.query[this.searchAttribute] = this.searchText.trim();
        this.setPage({ offset: 0 });
    }
}

