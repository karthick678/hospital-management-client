import { NgModule, ErrorHandler } from '@angular/core';
import { MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

// Routing
import { routing } from './app.routing.module';
import { HttpClientModule } from "@angular/common/http";
import { HttpClient } from "./guard/http.client";
import { AppErrorHandler } from "./guard/error.handler";

// Module
import { AuthGuard } from './guard/auth.guard';
import { CanDeactivateGuard } from './guard/can.deactivate.guard';
import { SharedModule } from './shared/shared.module';
import { ModelDialogComponent } from './shared/model-dialog/model-dialog.component';
import { ModelDialogContentComponent } from './shared/model-dialog-content/model-dialog-content.component';
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
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LoginModule,
    HomeModule,
    DashboardModule,
    DoctorModule,
    PatientModule,
    MedicineModule,
    MatDialogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    CanDeactivateGuard,
    HttpClient,
    { provide: ErrorHandler, useClass: AppErrorHandler }],
  entryComponents: [
    ModelDialogComponent,
    ModelDialogContentComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
