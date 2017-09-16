import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Doctor } from './../shared/doctor.model';
import { DoctorDetailsService } from './doctor.details.service';

@Component({
    selector: 'doctor-details',
    templateUrl: './doctor.details.component.html',
    styleUrls: ['./doctor.details.component.scss'],
    providers: [DoctorDetailsService]
})

export class DoctorDetailsComponent {
    doctor: Doctor;
    id: string;
    doctorName: string;
    genderList = [
        { value: 'male', viewValue: 'Male' },
        { value: 'female', viewValue: 'Female' }
    ];

    constructor(public snackBar: MdSnackBar, private doctorDetailsService: DoctorDetailsService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = this.activatedRoute.snapshot.params['id'];
            this.doctor = this.doctorDetailsService.sampleDoctor();
            if (this.id !== 'new')
                this.getDoctorDetails();
            else
                this.doctorName = "New Doctor";
        });
    }

    onSubmit() {
        if (this.doctor._id)
            this.updateDoctor();
        else
            this.createDoctor();
    }

    getDoctorDetails() {
        this.doctorDetailsService.getDoctorDetails(this.id).subscribe(doctor => {
            this.doctor = doctor;
            this.doctorName = this.doctor.name.first + ' ' + this.doctor.name.middle + ' ' + this.doctor.name.last;
        });
    }

    createDoctor() {
        this.doctorDetailsService.createDoctorDetails(this.doctor).subscribe(doctor => {
            this.doctor = doctor;
            this.router.navigate(['/doctor/details/' + this.doctor._id]);
        });
    }

    updateDoctor() {
        this.doctorDetailsService.updateDoctorDetails(this.doctor).subscribe(doctor => {
            this.doctor = doctor;
            this.snackBar.open('Update Successfully!', '', {
                duration: 1000,
                extraClasses: ['success-snackbar']
            });
        });
    }
}