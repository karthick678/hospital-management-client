import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { MaterialModule, MdNativeDateModule, DateAdapter, MD_DATE_FORMATS } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ModelDialogComponent } from './model-dialog/model-dialog.component';
import { SubheaderComponent } from './subheader/subheader.component';

/** ------------- App Date Format change -----------------------*/
import { AppDateAdapter } from './date-format/app.date.adapter';
import { APP_DATE_FORMATS } from './date-format/app.date.formats';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        CommonModule,
        MaterialModule,
        MdNativeDateModule,
        NgxDatatableModule,
        FlexLayoutModule],
    declarations: [SubheaderComponent, ModelDialogComponent],
    providers: [
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MD_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ],
    exports: [
        FormsModule, HttpModule, HttpClientModule, CommonModule, MaterialModule, MdNativeDateModule, NgxDatatableModule, FlexLayoutModule, SubheaderComponent, ModelDialogComponent
    ]
})
export class SharedModule { }


