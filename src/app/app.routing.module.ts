import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { MedicineComponent } from './medicine/medicine.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/patient/list',
        pathMatch: 'full'
    },
    {
        path: 'patient',
        loadChildren: './patient/patient.module#PatientModule',
    },
    {
        path: 'doctor',
        loadChildren: './doctor/doctor.module#DoctorModule',
    },
    {
        path: 'medicine',
        loadChildren: './medicine/medicine.module#MedicineModule',
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);