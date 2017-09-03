import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'report',
    templateUrl: './patient.report.component.html'
})

export class PatientReportComponent {
    id: string;
    constructor(private router: ActivatedRoute) {
    }

    ngOnInit() {
        this.id = this.router.snapshot.params['id'];
    }

}