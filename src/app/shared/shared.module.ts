import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { 
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS
 } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from "@angular/flex-layout";
import { MomentModule } from 'angular2-moment';

import { FlashMessageModule } from './flash-message/flash-message.module';

import { ModelDialogComponent } from './model-dialog/model-dialog.component';
import { ModelDialogContentComponent } from './model-dialog-content/model-dialog-content.component';
import { SubheaderComponent } from './subheader/subheader.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

/** ------------- App Date Format change -----------------------*/
import { AppDateAdapter } from './date-format/app.date.adapter';
import { APP_DATE_FORMATS } from './date-format/app.date.formats';

@NgModule({
    imports: [
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatInputModule, 
        MatSelectModule,
        MatSlideToggleModule,       
        MatDatepickerModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatSnackBarModule, 
        MatCheckboxModule,       
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        HttpClientModule,
        CommonModule,
        MatNativeDateModule,
        NgxDatatableModule,
        FlashMessageModule,
        FlexLayoutModule, MomentModule],
    declarations: [SubheaderComponent, UserProfileComponent, ModelDialogComponent, ModelDialogContentComponent],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ],
    exports: [
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        MatInputModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatSidenavModule,
        MatSnackBarModule,
        MatCheckboxModule,
        FormsModule, ReactiveFormsModule, HttpModule, HttpClientModule, CommonModule, MatNativeDateModule, NgxDatatableModule, FlashMessageModule, FlexLayoutModule, MomentModule, SubheaderComponent, UserProfileComponent, ModelDialogComponent, ModelDialogContentComponent
    ]
})
export class SharedModule { }


