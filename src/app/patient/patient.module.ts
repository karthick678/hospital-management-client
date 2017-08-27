import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { PatientRoutingModule } from './patient.routing.module'
import { PatientComponent } from './patient.component';
import { PatientListComponent } from './list/patient.list.component';
import { PatientDetailsComponent } from './details/patient.details.component';
import { PatientReportComponent } from './report/patient.report.component';
import { PatientReportBasicInfoComponent } from './report/basic-info/basic-info.component';
import { PatientReportVisitComponent } from './report/visits/visits.component';


@NgModule({
  imports: [
    SharedModule,
    PatientRoutingModule,
  ],
  declarations: [PatientComponent, PatientListComponent, PatientDetailsComponent, PatientReportComponent, PatientReportBasicInfoComponent, PatientReportVisitComponent]
})

export class PatientModule { }

