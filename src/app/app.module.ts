import { NgModule } from '@angular/core';
import { MdDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// Routing
import { routing } from './app.routing.module';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "./guard/http.client";

// Module
import { AuthGuard } from './guard/auth.guard';
import { SharedModule } from './shared/shared.module';
import { ModelDialogComponent } from './shared/model-dialog/model-dialog.component';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { DoctorModule } from './doctor/doctor.module';
import { PatientModule } from './patient/patient.module';
import { MedicineModule } from './medicine/medicine.module';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    HttpClientModule,
    SharedModule,
    LoginModule,
    HomeModule,
    DashboardModule,
    DoctorModule,
    PatientModule,
    MedicineModule,
    MdDialogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AuthGuard, HttpClient],
  entryComponents: [
    ModelDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
