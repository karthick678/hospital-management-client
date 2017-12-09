import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Checkup } from '../shared/checkup.model';
import { PatientCheckupComponentService } from './patient.checkup.service';
import { Doctor } from './../../doctor/shared/doctor.model';
import { DoctorDetailsService } from './../../doctor/details/doctor.details.service';
import { FormControl } from "@angular/forms";
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
    checkup: Checkup;
    doctorList: any;
    whenToTakeList = [{ viewValue: '-- select --', value: '' }, { viewValue: '1-1-1', value: '1-1-1' }, { viewValue: '1-0-1', value: '1-0-1' }, { viewValue: '0-0-1', value: '0-0-1' }, { viewValue: '0-1-0', value: '0-1-0' }, { viewValue: '1-0-0', value: '1-0-0' }];
    diagnosisName: string;
    filteredStates: Observable<any[]>;
    stateCtrl: FormControl;
    states: any[] = [
        {
            name: 'Arkansas',
            population: '2.978M',
        },
        {
            name: 'California',
            population: '39.14M',
        }
    ];

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private patientCheckupComponentService: PatientCheckupComponentService, private doctorDetailsService: DoctorDetailsService) {
        this.stateCtrl = new FormControl();
        this.filteredStates = this.stateCtrl.valueChanges
            .startWith(null)
            .map(state => state ? this.filterStates(state) : this.states.slice());
    }

    filterStates(name: string) {
        return this.states.filter(state =>
            state.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
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
            this.router.navigate(['/app/patient/checkup/' + this.patientId + '/' + this.checkup._id]);
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