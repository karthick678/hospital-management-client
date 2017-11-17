import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Doctor } from './../shared/doctor.model';
import { DoctorDetailsService } from './doctor.details.service';
import { ModelDialogComponent } from './../../shared/model-dialog/model-dialog.component';
import { ModelDialogContentComponent } from './../../shared/model-dialog-content/model-dialog-content.component';
import { FlashMessageService } from './../../shared/flash-message/flash-message.service';
import { AppSettings } from './../../app.settings';

@Component({
    selector: 'doctor-details',
    templateUrl: './doctor.details.component.html',
    styleUrls: ['./doctor.details.component.scss'],
    providers: [DoctorDetailsService]
})

export class DoctorDetailsComponent {
    dismiss: number = AppSettings.alert_dismiss;
    toState: string;
    doctor: Doctor;
    id: string;
    formSubmitAttempt: boolean = false;
    doctorName: string;
    doctorForm: FormGroup;
    isCancel: boolean = false;
    genderList = [
        { value: '', viewValue: '-- select --' },
        { value: 'male', viewValue: 'Male' },
        { value: 'female', viewValue: 'Female' }
    ];

    constructor(private flashMessageService: FlashMessageService, private doctorDetailsService: DoctorDetailsService, private activatedRoute: ActivatedRoute, private router: Router, public matDialog: MatDialog, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.buildForm();
            this.id = this.activatedRoute.snapshot.params['id'];
            this.doctorForm.setValue(this.doctorDetailsService.sampleDoctor());
            if (this.id !== 'new')
                this.getDoctorDetails();
            else
                this.doctorName = "New Doctor";
        });
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.doctorForm.status === "VALID") {
            if (this.doctorForm.value._id)
                this.updateDoctor();
            else
                this.createDoctor();
        }
    }

    getDoctorDetails() {
        this.doctorDetailsService.getDoctorDetails(this.id).subscribe(doctor => {
            this.doctorForm.patchValue(doctor);
            this.doctorName = this.doctorForm.value.name.first + ' ' + this.doctorForm.value.name.middle + ' ' + this.doctorForm.value.name.last;
        });
    }

    createDoctor() {
        this.doctorDetailsService.createDoctorDetails(this.doctorForm.value).subscribe(doctor => {
            this.doctorForm.patchValue(doctor);
            if (!this.toState)
                this.toState = '/app/doctor/details/' + this.doctor._id;
            this.isCancel = true;
            this.alertSuccess('Created successfully');
        }, (error) => {
            if (error && error.code === 11000) {
                this.isMobileNumberError();
            }
        });
    }

    updateDoctor() {
        if (this.doctorForm.dirty) {
            this.doctorDetailsService.updateDoctorDetails(this.doctorForm.value).subscribe(doctor => {
                this.doctorForm.patchValue(doctor);
                this.alertSuccess('Updated successfully');
                this.doctorForm.markAsPristine();
            }, (error) => {
                if (error && error.code === 11000) {
                    this.isMobileNumberError();
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
                this.deleteDoctor();
            }
        });
    }

    deleteDoctor() {
        let id = this.doctorForm.value._id;
        this.doctorDetailsService.deleteDoctor(id).subscribe(res => {
            this.alertSuccess('Deleted successfully');
            this.router.navigate(['/app/doctor/list']);
        });
    }

    buildForm() {
        this.doctorForm = this.formBuilder.group({
            _id: '',
            name: this.formBuilder.group({
                first: ['', Validators.compose([Validators.required])],
                middle: '',
                last: ''
            }),
            email: ['', Validators.compose([Validators.required])],
            gender: ['', Validators.compose([Validators.required])],
            mobileNumber: ['', Validators.compose([Validators.required])],
            phoneNumber: '',
            status: ['', Validators.compose([Validators.required])]
        });
    }

    alertError() {
        this.flashMessageService.show('Please update a field to save the page content', {
            classes: ['error'],
            timeout: this.dismiss
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

    canDeactivate(next: any) {
        if (this.doctorForm.dirty && this.doctorForm.status === "VALID" && !this.isCancel) {
            let matDialog = this.matDialog.open(ModelDialogComponent, {
                disableClose: true,
                data: { type: 'save' }
            });
            matDialog.afterClosed().subscribe(isSave => {
                if (isSave) {
                    this.toState = next.url;
                    this.onSubmit();
                } else {
                    this.doctorForm.markAsPristine();
                    this.goToState(next.url);
                }
            });
        } else if (this.doctorForm.status !== "VALID" && !this.isCancel) {
            this.onSubmit();
            return false;
        } else {
            return true;
        }
    }

    isMobileNumberError() {
        this.toState = '';
        this.matDialog.open(ModelDialogContentComponent, {
            data: {
                message: 'You have entered a mobile number that already exists. Only unique mobile number is allowed'
            }
        });
    }

    goToState(state: string) {
        this.isCancel = true;
        this.router.navigate([state]);
    }
}
