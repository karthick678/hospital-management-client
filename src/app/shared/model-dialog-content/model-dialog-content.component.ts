import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'model-dialog-content',
    templateUrl: './model-dialog-content.component.html',
    styleUrls: ['./model-dialog-content.component.scss']
})

export class ModelDialogContentComponent {
    constructor( @Inject(MD_DIALOG_DATA) public data: any) { }
}