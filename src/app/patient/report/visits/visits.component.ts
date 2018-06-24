import { Component, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Checkup } from './../../shared/checkup.model';
import { Page } from './../../shared/page.model';
import { SharedService } from './../../../shared/shared.service';
import { ModelDialogComponent } from './../../../shared/model-dialog/model-dialog.component';

@Component({
    selector: 'visits',
    templateUrl: './visits.component.html',
    styleUrls: ['visits.component.scss'],
    providers: [SharedService]
})

export class PatientReportVisitComponent {
    @Input() checkup: Checkup;
    @Input() patientId: string;
    @Input() page: Page;
    @Output() getCheckups = new EventEmitter();
    @Output() deleteCheckup = new EventEmitter();
    @ViewChild('editTmpl') editTmpl: TemplateRef<any>;
    columns: any = [];
    pageSizeList: any = [];

    constructor(private sharedService: SharedService, public matDialog: MatDialog) {
        this.pageSizeList = sharedService.getPageSizeList();
    }

    ngOnInit() {
        this.columns = [{
            cellTemplate: this.editTmpl,
        }];
    }

    getCheckupss(pageInfo: any) {
        this.getCheckups.emit(pageInfo);
    }

    openmatDialog(row: Checkup) {
        let matDialog = this.matDialog.open(ModelDialogComponent, {
            data: {
                type: 'delete'
            }
        });
        matDialog.afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.deleteCheckup.emit(row);
            }
        });
    }


}