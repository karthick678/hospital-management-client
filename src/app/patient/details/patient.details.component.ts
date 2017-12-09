import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ModelDialogComponent } from './../../shared/model-dialog/model-dialog.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelDialogContentComponent } from './../../shared/model-dialog-content/model-dialog-content.component';
import { FlashMessageService } from './../../shared/flash-message/flash-message.service';
import { Patient } from './../shared/patient.model';
import { PatientDetailsService } from './patient.details.service';
import { AppSettings } from './../../app.settings';

@Component({
    selector: 'patient-details',
    templateUrl: './patient.details.component.html',
    styleUrls: ['./patient.details.component.scss'],
    providers: [PatientDetailsService]
})

export class PatientDetailsComponent {
    dismiss: number = AppSettings.alert_dismiss;
    id: string;
    patientName: string;
    toState: string;
    isCancel: boolean = false;
    formSubmitAttempt: boolean = false;
    patientForm: FormGroup;
    genderList = [
        { value: '', viewValue: '-- select --' },
        { value: 'Male', viewValue: 'Male' },
        { value: 'Female', viewValue: 'Female' }
    ];
    bloodGroupsList = [
        { value: '', viewValue: '-- select --' },
        { value: 'O+', viewValue: 'O+' },
        { value: 'O-', viewValue: 'O-' },
        { value: 'A+', viewValue: 'A+' },
        { value: 'A-', viewValue: 'A-' },
        { value: 'B+', viewValue: 'B+' },
        { value: 'B-', viewValue: 'B-' },
        { value: 'AB+', viewValue: 'AB+' },
        { value: 'AB-', viewValue: 'AB-' },
    ];

    constructor(private flashMessageService: FlashMessageService, private patientDetailsService: PatientDetailsService, private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, public matDialog: MatDialog) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.buildForm();
            this.id = this.activatedRoute.snapshot.params['id'];
            this.patientForm.setValue(this.patientDetailsService.samplePatient());
            if (this.id !== 'new')
                this.getPatientDetails();
            else
                this.patientName = "New Patient";
        });
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.patientForm.status === "VALID") {
            if (this.patientForm.value._id)
                this.updatePatient();
            else
                this.createPatient();
        }
    }

    getPatientDetails() {
        this.patientDetailsService.getPatientDetails(this.id).subscribe(patient => {
            this.patientForm.patchValue(patient);
            this.patientName = this.patientForm.value.name.first + ' ' + this.patientForm.value.name.middle + ' ' + this.patientForm.value.name.last;
        });
    }

    createPatient() {
        this.patientDetailsService.createPatientDetails(this.patientForm.value).subscribe(patient => {
            this.patientForm.patchValue(patient);
            if (!this.toState)
                this.toState = '/app/patient/details/' + this.patientForm.value._id;
            this.isCancel = true;
            this.alertSuccess('Created successfully');
        }, (error) => {
            var code = JSON.parse(error._body).code;
            if ((error && error.code === 11000) || code === 11000) {
                this.isNameError();
            }
        });
    }

    updatePatient() {
        if (this.patientForm.dirty) {
            this.patientDetailsService.updatePatientDetails(this.patientForm.value).subscribe(patient => {
                this.patientForm.patchValue(patient);
                this.alertSuccess('Updated successfully');
                this.patientForm.markAsPristine();
            }, (error) => {
                var code = JSON.parse(error._body).code;
                if ((error && error.code === 11000) || code === 11000) {
                    this.isNameError();
                }
            });
        } else {
            this.alertError();
        }
    }

    deleteConfirm() {
        let matDialog = this.matDialog.open(ModelDialogComponent, {
            data: {
                type: 'delete'
            }
        });
        matDialog.afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.deletePatient();
            }
        });
    }

    deletePatient() {
        let id = this.patientForm.value._id;
        this.patientDetailsService.deletePatient(id).subscribe(res => {
            this.alertSuccess('Deleted successfully');
            this.router.navigate(['/app/patient/list']);
        });
    }

    buildForm() {
        this.patientForm = this.formBuilder.group({
            _id: '',
            name: this.formBuilder.group({
                first: ['', Validators.compose([Validators.required])],
                middle: '',
                last: ''
            }),
            dob: '',
            gender: '',
            bloodGroup: '',
            address: this.formBuilder.group({
                address1: '',
                address2: '',
                city: '',
                state: '',
                pincode: '',
            }),
            mobileNumber: ['', Validators.compose([Validators.required])],
            phoneNumber: '',
            status: [true, Validators.compose([Validators.required])]
        });
    }

    alertSuccess(message: string) {
        this.flashMessageService.show(message, {
            classes: ['success'],
            timeout: this.dismiss
        });
        if (this.toState)
            this.router.navigate([this.toState]);
        else
            this.toState = '';
    }

    alertError() {
        this.flashMessageService.show('Please update a field to save the page content', {
            classes: ['error'],
            timeout: this.dismiss
        });
    }

    isNameError() {
        this.toState = '';
        this.matDialog.open(ModelDialogContentComponent, {
            data: {
                message: 'You have entered a name that already exists. Only unique name is allowed'
            }
        });
    }

    canDeactivate(next: any) {
        if (this.patientForm.dirty && this.patientForm.status === "VALID" && !this.isCancel) {
            let matDialog = this.matDialog.open(ModelDialogComponent, {
                disableClose: true,
                data: { type: 'save' }
            });
            matDialog.afterClosed().subscribe(isSave => {
                if (isSave) {
                    this.toState = next.url;
                    this.onSubmit();
                } else {
                    this.patientForm.markAsPristine();
                    this.goToState(next.url);
                }
            });
        } else if (this.patientForm.status !== "VALID" && !this.isCancel) {
            this.onSubmit();
            return false;
        } else {
            return true;
        }
    }

    goToState(state: string) {
        this.isCancel = true;
        this.router.navigate([state]);
    }
}