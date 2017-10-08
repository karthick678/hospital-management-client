import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'model-dialog',
    templateUrl: './model-dialog.component.html'
})

export class ModelDialogComponent {
    deleteMessage = {
        title: 'Delete Confirmation Required',
        message: 'Are you sure you want delete this item?',
    };

    saveMessage = {
        title: 'Confirmation Message',
        message: 'Do you want to save the changes?',
    };

    displayMessage = {
        title: '',
        message: ''
    };

    constructor( @Inject(MAT_DIALOG_DATA) public data: any) {
        this.displayMessageByType(data.type);
    }

    displayMessageByType(type: string) {
        if (type === 'delete') {
            this.displayMessage = this.deleteMessage;
        } else if (type === 'save') {
            this.displayMessage = this.saveMessage;
        }
    }
}