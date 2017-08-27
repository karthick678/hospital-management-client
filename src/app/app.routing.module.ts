import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient/patient.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/patient/list',
        pathMatch: 'full'
    },
    {
        path: 'patient',
        loadChildren: './patient/patient.module#PatientModule',
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);