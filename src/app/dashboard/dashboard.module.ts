import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule,
    ],
    declarations: [
        DashboardComponent]
})

export class DashboardModule { }

