import { NgModule } from '@angular/core';
import { MdDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// Routing
import { routing } from './app.routing.module';

// Module
import { SharedModule } from './shared/shared.module';
import { ModelDialogComponent } from './shared/model-dialog/model-dialog.component';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { MedicineModule } from './medicine/medicine.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    SharedModule,
    DoctorModule,
    PatientModule,
    MedicineModule,
    MdDialogModule
  ],
  declarations: [
    AppComponent
  ],
  entryComponents: [
    ModelDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
