import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Patient } from './../shared/patient.model';
import { PatientDetailsService } from './patient.details.service';

@Component({
    selector: 'patient-details',
    templateUrl: './patient.details.component.html',
    styleUrls: ['./patient.details.component.scss'],
    providers: [PatientDetailsService]
})

export class PatientDetailsComponent {
    patient: Patient;
    id: string;
    patientName: string;
    genderList = [
        { value: 'male', viewValue: 'Male' },
        { value: 'female', viewValue: 'Female' }
    ];

    constructor(private patientDetailsService: PatientDetailsService, private activatedRoute: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = this.activatedRoute.snapshot.params['id'];
            this.patient = this.patientDetailsService.samplePatient();
            if (this.id !== 'new')
                this.getPatientDetails();
            else
                this.patientName = "New Patient";
        });
    }

    onSubmit() {
        if (this.patient._id)
            this.updatePatient();
        else
            this.createPatient();
    }

    getPatientDetails() {
        this.patientDetailsService.getPatientDetails(this.id).subscribe(patient => {
            this.patient = patient;
            this.patientName = this.patient.name.first + ' ' + this.patient.name.middle + ' ' + this.patient.name.last;
        });
    }

    createPatient() {
        this.patientDetailsService.createPatientDetails(this.patient).subscribe(patient => {
            this.patient = patient;
            this.router.navigate(['/patient/details/' + this.patient._id]);
        });
    }

    updatePatient() {
        this.patientDetailsService.updatePatientDetails(this.patient).subscribe(patient => {
            this.patient = patient;
        });
    }
}