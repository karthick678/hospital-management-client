import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { DashboardModule } from './../dashboard/dashboard.module'
import { DashboardComponent } from './../dashboard/dashboard.component';
import { DoctorModule } from './../doctor/doctor.module';
import { DoctorComponent } from './../doctor/doctor.component';
import { DoctorListComponent } from './../doctor/list/doctor.list.component';
import { DoctorDetailsComponent } from './../doctor/details/doctor.details.component';

import { PatientComponent } from './../patient/patient.component';
import { PatientListComponent } from './../patient/list/patient.list.component';
import { PatientDetailsComponent } from './../patient/details/patient.details.component';
import { PatientReportComponent } from './../patient/report/patient.report.component';
import { PatientReportBasicInfoComponent } from './../patient/report/basic-info/basic-info.component';
import { PatientReportVisitComponent } from './../patient/report/visits/visits.component';
import { PatientCheckupComponent } from './../patient/checkup/patient.checkup.component';


import { MedicineComponent } from './../medicine/medicine.component';
import { MedicineStockComponent } from './../medicine/stock/medicine.stock.component';
import { StockListComponent } from './../medicine/stock/list/stock.list.component';
import { StockDetailsComponent } from './../medicine/stock/details/stock.details.component';

import { MedicineCategoryComponent } from './../medicine/category/medicine.category.component';
import { CategoryListComponent } from './../medicine/category/list/category.list.component';
import { CategoryDetailsComponent } from './../medicine/category/details/category.details.component';


import { AuthGuard } from './../guard/auth.guard';

const HomeRoutes: Routes = [
    {
        path: 'app',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'doctor',
                component: DoctorComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: DoctorListComponent },
                    { path: 'details/:id', component: DoctorDetailsComponent },
                ]
            },
            {
                path: 'patient',
                component: PatientComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: PatientListComponent },
                    { path: 'details/:id', component: PatientDetailsComponent },
                    { path: 'report/:id', component: PatientReportComponent },
                    { path: 'checkup/:patientId/:id', component: PatientCheckupComponent }
                ]
            },
            {
                path: 'medicine',
                component: MedicineComponent,
                children: [
                    { path: '', redirectTo: 'stock', pathMatch: 'full' },
                    {
                        path: 'stock',
                        component: MedicineStockComponent,
                        children: [
                            { path: '', redirectTo: 'list', pathMatch: 'full' },
                            {
                                path: 'list',
                                component: StockListComponent,
                            },
                            { path: 'details/:id', component: StockDetailsComponent },
                        ]
                    },
                    {
                        path: 'category', component: MedicineCategoryComponent,
                        children: [
                            { path: '', redirectTo: 'list', pathMatch: 'full' },
                            {
                                path: 'list',
                                component: CategoryListComponent,
                            },
                            { path: 'details/:id', component: CategoryDetailsComponent },
                        ]
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(HomeRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class HomeRoutingModule { }