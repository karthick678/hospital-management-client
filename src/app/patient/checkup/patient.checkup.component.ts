import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Checkup } from '../shared/checkup.model';
import { PatientCheckupComponentService } from './patient.checkup.service';

@Component({
    selector: 'patient-checkup',
    templateUrl: './patient.checkup.component.html',
    styleUrls: ['./patient.checkup.component.scss'],
    providers: [PatientCheckupComponentService]
})

export class PatientCheckupComponent {
    id: string;
    patientId: string;
    checkup: Checkup;
    doctorList = [{ viewValue: '-- select --', value: '' }, { viewValue: 'karthick', value: 'karthick' }]
    whenToTakeList = [{ viewValue: '-- select --', value: '' }, { viewValue: '1-1-1', value: '1-1-1' }, { viewValue: '1-0-1', value: '1-0-1' }, { viewValue: '0-0-1', value: '0-0-1' }, { viewValue: '0-1-0', value: '0-1-0' }, { viewValue: '1-0-0', value: '1-0-0' }];
    diagnosisName: string;

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private patientCheckupComponentService: PatientCheckupComponentService) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = this.activatedRoute.snapshot.params['id'];
            this.patientId = this.activatedRoute.snapshot.params['patientId'];
            this.checkup = this.patientCheckupComponentService.sampleCheckup();
            this.checkup.patientId = this.patientId;
            if (this.id !== 'new')
                this.getCheckupDetails();
            else
                this.diagnosisName = "New Checkup";
        });
    }

    onSubmit() {
        if (this.checkup._id)
            this.updateCheckupDetails();
        else
            this.createCheckupDetails();
    }

    getCheckupDetails() {
        this.patientCheckupComponentService.getCheckupDetails(this.id).subscribe(checkup => {
            this.checkup = checkup;
            this.diagnosisName = this.checkup.diagnosis;
        });
    }

    createCheckupDetails() {
        this.patientCheckupComponentService.createCheckupDetails(this.checkup).subscribe(checkup => {
            this.checkup = checkup;
            this.router.navigate(['/patient/checkup/' + this.patientId + '/' + this.checkup._id]);
        });
    }

    updateCheckupDetails() {
        this.patientCheckupComponentService.updatePatientDetails(this.checkup).subscribe(checkup => {
            this.checkup = checkup;
        });
    }

    deleteMedicine(index: number) {
        this.checkup.prescription.splice(index, 1);
    }

    addMedicine() {
        let prescription = this.patientCheckupComponentService.sampleCheckup().prescription[0];
        this.checkup.prescription.push(prescription);
    }
}