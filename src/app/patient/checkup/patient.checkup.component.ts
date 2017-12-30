import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ModelDialogComponent } from './../../shared/model-dialog/model-dialog.component';
import { Checkup } from '../shared/checkup.model';
import { PatientCheckupComponentService } from './patient.checkup.service';
import { FlashMessageService } from './../../shared/flash-message/flash-message.service';
import { Doctor } from './../../doctor/shared/doctor.model';
import { DoctorDetailsService } from './../../doctor/details/doctor.details.service';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { AppSettings } from './../../app.settings';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'patient-checkup',
    templateUrl: './patient.checkup.component.html',
    styleUrls: ['./patient.checkup.component.scss'],
    providers: [PatientCheckupComponentService, DoctorDetailsService]
})

export class PatientCheckupComponent {
    dismiss: number = AppSettings.alert_dismiss;
    id: string;
    isCancel: boolean = false;
    toState: string;
    patientId: string;
    doctorList: any;
    whenToTakeList = [{ viewValue: '-- select --', value: '' }, { viewValue: '1-1-1', value: '1-1-1' }, { viewValue: '1-0-1', value: '1-0-1' }, { viewValue: '0-0-1', value: '0-0-1' }, { viewValue: '0-1-0', value: '0-1-0' }, { viewValue: '1-0-0', value: '1-0-0' }];
    diagnosisName: string;
    checkupForm: FormGroup;
    defaultPrescription = {
        medicine: '',
        noOfDays: 0,
        whenToTake: '',
        beforeMeal: false,
    };
    formSubmitAttempt: boolean = false;

    constructor(private flashMessageService: FlashMessageService, private router: Router, private activatedRoute: ActivatedRoute, private patientCheckupComponentService: PatientCheckupComponentService, private formBuilder: FormBuilder, private doctorDetailsService: DoctorDetailsService, public matDialog: MatDialog) {

    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.buildForm();
            this.id = this.activatedRoute.snapshot.params['id'];
            this.patientId = this.activatedRoute.snapshot.params['patientId'];
            this.checkupForm.setValue(this.patientCheckupComponentService.sampleCheckup());
            this.checkupForm.patchValue({ 'patientId': this.patientId });
            if (this.id !== 'new')
                this.getCheckupDetails();
            else
                this.diagnosisName = "New Checkup";
        });
        this.doctorDetailsService.getAllDoctors().subscribe(doctors => {
            this.doctorList = this.doctorsPicklist(doctors);
        });
    }

    doctorsPicklist(doctors: any) {
        let picklist = [{ name: '-- select --', value: '' }], doctorsLength = doctors.length;
        for (let index = 0; index < doctorsLength; index++) {
            let doctor = {
                name: doctors[index].name.first + ' ' + doctors[index].name.middle + ' ' + doctors[index].name.last + ' <' + doctors[index].email + '>',
                value: doctors[index]._id
            }
            if (this.id !== 'new') {
                picklist.push(doctor);
            } else if (doctors[index].status) {
                picklist.push(doctor);
            }
        }
        return picklist;
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.checkupForm.status === "VALID") {
            if (this.checkupForm.value._id)
                this.updateCheckupDetails();
            else
                this.createCheckupDetails();
        }
    }

    getCheckupDetails() {
        this.patientCheckupComponentService.getCheckupDetails(this.id).subscribe(checkup => {
            this.setCheckupForm(checkup);
        });
    }

    setCheckupForm(checkup: any) {
        this.checkupForm.patchValue({
            doctorName: checkup.doctorName,
            checkupDate: checkup.checkupDate,
            symptoms: checkup.symptoms,
            diagnosis: checkup.diagnosis,
            extraNotes: checkup.extraNotes
        });
        for (let key = 0; key < checkup.prescription.length; key++) {
            this.addPrescriptions(checkup.prescription[key]);
        }
        this.diagnosisName = this.checkupForm.value.diagnosis;
    }

    createCheckupDetails() {
        this.patientCheckupComponentService.createCheckupDetails(this.checkupForm.value).subscribe(checkup => {
            this.checkupForm.patchValue(checkup);
            if (!this.toState)
                this.toState = '/app/patient/checkup/' + this.patientId + '/' + this.checkupForm.value._id;
            this.isCancel = true;
            this.alertSuccess('Created successfully');
            //this.router.navigate(['/app/patient/checkup/' + this.patientId + '/' + this.checkupForm.value._id]);
        });
    }

    updateCheckupDetails() {
        this.patientCheckupComponentService.updatePatientDetails(this.checkupForm.value).subscribe(checkup => {
            this.checkupForm.patchValue(checkup);
            this.alertSuccess('Updated successfully');
            this.checkupForm.markAsPristine();
        });
    }

    deletePrescriptions(index: number) {
        const prescription = <FormArray>this.checkupForm.get('prescription');
        prescription.removeAt(index);
    }

    addPrescriptions(data: any) {
        const prescription = <FormArray>this.checkupForm.get('prescription');
        prescription.push(this.createPrescription(data));
    }

    buildForm() {
        this.checkupForm = this.formBuilder.group({
            _id: '',
            patientId: '',
            doctorName: '',
            checkupDate: new Date(),
            symptoms: ['', Validators.compose([Validators.required])],
            diagnosis: ['', Validators.compose([Validators.required])],
            prescription: this.formBuilder.array([]),
            extraNotes: ''
        });
    }

    createPrescription(prescription: any): FormGroup {
        return this.formBuilder.group({
            medicine: [prescription.medicine, Validators.compose([Validators.required])],
            noOfDays: prescription.noOfDays,
            whenToTake: [prescription.whenToTake, Validators.compose([Validators.required])],
            beforeMeal: prescription.beforeMeal
        });
    }

    canDeactivate(next: any) {
        if (this.checkupForm.dirty && this.checkupForm.status === "VALID" && !this.isCancel) {
            let matDialog = this.matDialog.open(ModelDialogComponent, {
                disableClose: true,
                data: { type: 'save' }
            });
            matDialog.afterClosed().subscribe(isSave => {
                if (isSave) {
                    this.toState = next.url;
                    this.onSubmit();
                } else {
                    this.checkupForm.markAsPristine();
                    this.goToState(next.url);
                }
            });
        } else if (this.checkupForm.status !== "VALID" && !this.isCancel) {
            this.onSubmit();
            return false;
        } else {
            return true;
        }
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

    goToState(state: string) {
        this.isCancel = true;
        this.router.navigate([state]);
    }
}
