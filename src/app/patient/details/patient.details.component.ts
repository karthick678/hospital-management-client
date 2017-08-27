import { Component } from '@angular/core';

@Component({
    selector: 'patient-details',
    templateUrl: './patient.details.component.html',
    styleUrls: ['./patient.details.component.scss']
})

export class PatientDetailsComponent {
    foods = [
        { value: 'male', viewValue: 'Male' },
        { value: 'female', viewValue: 'Female' }
    ];
}