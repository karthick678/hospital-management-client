import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { DoctorListComponent } from './list/doctor.list.component';
import { DoctorDetailsComponent } from './details/doctor.details.component';

@NgModule({
    imports: [
        RouterModule,
        SharedModule
    ],
    declarations: [
        DoctorComponent,
        DoctorListComponent,
        DoctorDetailsComponent
    ]
})

export class DoctorModule { }

