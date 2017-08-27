import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientComponent } from './patient.component';
import { PatientListComponent } from './list/patient.list.component';
import { PatientDetailsComponent } from './details/patient.details.component';
import { PatientReportComponent } from './report/patient.report.component';

const patientRoutes: Routes = [
    {
        path: 'patient',
        component: PatientComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: PatientListComponent },
            { path: 'details/:id', component: PatientDetailsComponent },
            { path: 'report/:id', component: PatientReportComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(patientRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PatientRoutingModule { }