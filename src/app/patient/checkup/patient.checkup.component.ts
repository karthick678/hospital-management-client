import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Checkup } from '../shared/checkup.model';
import { PatientCheckupComponentService } from './patient.checkup.service';
import { Doctor } from './../../doctor/shared/doctor.model';
import { DoctorDetailsService } from './../../doctor/details/doctor.details.service';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';

@Component({
    selector: 'patient-checkup',
    templateUrl: './patient.checkup.component.html',
    styleUrls: ['./patient.checkup.component.scss'],
    providers: [PatientCheckupComponentService, DoctorDetailsService]
})

export class PatientCheckupComponent {
    id: string;
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

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private patientCheckupComponentService: PatientCheckupComponentService, private formBuilder: FormBuilder, private doctorDetailsService: DoctorDetailsService) {

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
        if (this.checkupForm.value._id)
            this.updateCheckupDetails();
        else
            this.createCheckupDetails();
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
            this.router.navigate(['/app/patient/checkup/' + this.patientId + '/' + this.checkupForm.value._id]);
        });
    }

    updateCheckupDetails() {
        this.patientCheckupComponentService.updatePatientDetails(this.checkupForm.value).subscribe(checkup => {
            this.checkupForm.patchValue(checkup);
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
            symptoms: '',
            diagnosis: '',
            prescription: this.formBuilder.array([this.createPrescription(this.defaultPrescription)]),
            extraNotes: ''
        });
    }

    createPrescription(prescription: any): FormGroup {
        return this.formBuilder.group({
            medicine: prescription.medicine,
            noOfDays: prescription.noOfDays,
            whenToTake: prescription.whenToTake,
            beforeMeal: prescription.beforeMeal
        });
    }
}

class Prescription {
    medicine: string;
    noOfDays: number;
    whenToTake: string;
    beforeMeal: boolean;
}