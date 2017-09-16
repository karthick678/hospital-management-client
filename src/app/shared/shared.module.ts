import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FlexLayoutModule } from "@angular/flex-layout";

import { ModelDialogComponent } from './model-dialog/model-dialog.component';
import { SubheaderComponent } from './subheader/subheader.component';

@NgModule({
    imports: [
        FormsModule,
        HttpModule,
        CommonModule,
        MaterialModule,
        MdNativeDateModule,
        NgxDatatableModule,
        FlexLayoutModule],
    declarations: [SubheaderComponent, ModelDialogComponent],
    exports: [
        FormsModule, HttpModule, CommonModule, MaterialModule, MdNativeDateModule, NgxDatatableModule, FlexLayoutModule, SubheaderComponent, ModelDialogComponent
    ]
})
export class SharedModule { }


