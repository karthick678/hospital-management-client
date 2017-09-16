import { Component, Input } from '@angular/core';

import { Patient } from './../../shared/patient.model';

@Component({
    selector: 'basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss']
})

export class PatientReportBasicInfoComponent {
    @Input() patient: Patient;
}