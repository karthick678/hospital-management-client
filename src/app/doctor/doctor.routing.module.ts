import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoctorComponent } from './doctor.component';
import { DoctorListComponent } from './list/doctor.list.component';
import { DoctorDetailsComponent } from './details/doctor.details.component';

const doctorRoutes: Routes = [
    {
        path: 'doctor',
        component: DoctorComponent,
        children: [
            { path: '', redirectTo: 'list', pathMatch: 'full' },
            { path: 'list', component: DoctorListComponent },
            { path: 'details/:id', component: DoctorDetailsComponent },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(doctorRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class DoctorRoutingModule { }