import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { FlashMessageService } from './flash-message.service';
import { FlashMessageComponent } from './flash-message.component';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    providers: [
        FlashMessageService,
    ],
    declarations: [
        FlashMessageComponent,
    ],
    exports: [
        FlashMessageComponent,
    ]
})
export class FlashMessageModule { }