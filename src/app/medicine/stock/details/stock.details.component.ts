import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StockDetailsService } from './stock.details.service';
import { MedicineCategoryComponentService } from './../../category/medicine.category.service';
import { Stock } from './../../shared/stock.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelDialogComponent } from './../../../shared/model-dialog/model-dialog.component';
import { ModelDialogContentComponent } from './../../../shared/model-dialog-content/model-dialog-content.component';
import { FlashMessageService } from './../../../shared/flash-message/flash-message.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppSettings } from './../../../app.settings';

@Component({
    selector: 'stock-details',
    templateUrl: './stock.details.component.html',
    styleUrls: ['./stock.details.component.scss'],
    providers: [StockDetailsService, MedicineCategoryComponentService]
})

export class StockDetailsComponent {
    dismiss: number = AppSettings.alert_dismiss;
    toState: string;
    id: string;
    formSubmitAttempt: boolean = false;
    stockName: string;
    stockForm: FormGroup;
    isCancel: boolean = false;
    categoryList: any[];

    constructor(private medicineCategoryComponentService: MedicineCategoryComponentService, private flashMessageService: FlashMessageService, private stockDetailsService: StockDetailsService, private activatedRoute: ActivatedRoute, private router: Router, public matDialog: MatDialog, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.buildForm();
            this.id = this.activatedRoute.snapshot.params['id'];
            this.stockForm.setValue(this.stockDetailsService.sampleStock());
            if (this.id !== 'new')
                this.getStockDetails();
            else
                this.stockName = "New Stock";
        });
    }

    getStockDetails() {
        this.stockDetailsService.getStockDetails(this.id).subscribe(stock => {
            this.stockForm.patchValue(stock);
            this.stockName = this.stockForm.value.name;
        });
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.stockForm.status === "VALID") {
            if (this.stockForm.value._id)
                this.updateStock();
            else
                this.createStock();
        }
    }

    createStock() {
        this.stockDetailsService.createStockDetails(this.stockForm.value).subscribe(stock => {
            this.stockForm.patchValue(stock);
            if (!this.toState)
                this.toState = '/app/medicine/stock/details/' + this.stockForm.value._id;
            this.isCancel = true;
            this.alertSuccess('Created successfully');
        }, (error) => {
            if (error && error.code === 11000) {
                this.isNameError();
            }
        });
    }

    updateStock() {
        if (this.stockForm.dirty) {
            this.stockDetailsService.updateStockDetails(this.stockForm.value).subscribe(stock => {
                this.stockForm.patchValue(stock);
                this.alertSuccess('Updated successfully');
                this.stockForm.markAsPristine();
            }, (error) => {
                if (error && error.code === 11000) {
                    this.isNameError();
                }
            });
        } else {
            this.alertError();
        }
    }

    deleteConfirm() {
        let matDialog = this.matDialog.open(ModelDialogComponent, {
            data: {
                type: 'delete'
            }
        });
        matDialog.afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.deleteStock();
            }
        });
    }

    deleteStock() {
        let id = this.stockForm.value._id;
        this.stockDetailsService.deleteStock(id).subscribe(res => {
            this.router.navigate(['/app/medicine/stock/list']);
        });
    }

    buildForm() {
        this.getAllCategories();
        this.stockForm = this.formBuilder.group({
            _id: '',
            name: ['', Validators.compose([Validators.required])],
            category: ['', Validators.compose([Validators.required])],
            price: '',
            qty: '',
            genericName: '',
            company: '',
            description: '',
            effects: '',
            expireDate: ['', Validators.compose([Validators.required])],
            status: ['', Validators.compose([Validators.required])]
        });
    }

    alertError() {
        this.flashMessageService.show('Please update a field to save the page content', {
            classes: ['error'],
            timeout: this.dismiss
        });
    }

    alertSuccess(message: string) {
        this.flashMessageService.show(message, {
            classes: ['success'],
            timeout: this.dismiss
        });
        if (this.toState)
            this.router.navigate([this.toState]);
        else
            this.toState = '';
    }

    canDeactivate(next: any) {
        if (this.stockForm.dirty && this.stockForm.status === "VALID" && !this.isCancel) {
            let matDialog = this.matDialog.open(ModelDialogComponent, {
                disableClose: true,
                data: { type: 'save' }
            });
            matDialog.afterClosed().subscribe(isSave => {
                if (isSave) {
                    this.toState = next.url;
                    this.onSubmit();
                } else {
                    this.stockForm.markAsPristine();
                    this.goToState(next.url);
                }
            });
        } else if (this.stockForm.status !== "VALID" && !this.isCancel) {
            this.onSubmit();
            return false;
        } else {
            return true;
        }
    }

    isNameError() {
        this.toState = '';
        this.matDialog.open(ModelDialogContentComponent, {
            data: {
                message: 'You have entered a name that already exists. Only unique name is allowed'
            }
        });
    }

    getAllCategories() {
        let searchQuery = {
            status: true
        };
        this.medicineCategoryComponentService.getAllCategories(searchQuery).subscribe(categories => {
            this.categoryList = categories;
            this.categoryList.unshift({ name: '-- select --', _id: '' });
        });
    }

    goToState(state: string) {
        this.isCancel = true;
        this.router.navigate([state]);
    }
}
