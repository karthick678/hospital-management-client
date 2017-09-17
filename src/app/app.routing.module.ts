import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientComponent } from './patient/patient.component';
import { MedicineComponent } from './medicine/medicine.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }, {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
    }, {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
    },
    {
        path: 'doctor',
        loadChildren: './doctor/doctor.module#DoctorModule',
    },
    {
        path: 'patient',
        loadChildren: './patient/patient.module#PatientModule',
    },
    {
        path: 'medicine',
        loadChildren: './medicine/medicine.module#MedicineModule',
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);