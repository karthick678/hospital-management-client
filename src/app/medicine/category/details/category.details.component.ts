import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CategoryDetailsService } from './category.details.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Category } from './../../shared/category.model';
import { ActivatedRoute, Params, Router, Event, RouterStateSnapshot } from '@angular/router';
import { ModelDialogComponent } from './../../../shared/model-dialog/model-dialog.component';
import { ModelDialogContentComponent } from './../../../shared/model-dialog-content/model-dialog-content.component';
import { FlashMessageService } from './../../../shared/flash-message/flash-message.service';
import { AppSettings } from './../../../app.settings';

@Component({
    selector: 'category-details',
    templateUrl: './category.details.component.html',
    styleUrls: ['./category.details.component.scss'],
    providers: [CategoryDetailsService]
})

export class CategoryDetailsComponent {
    dismiss: number = AppSettings.alert_dismiss;
    toState: string;
    id: string;
    formSubmitAttempt: boolean = false;
    categoryName: string;
    categoryForm: FormGroup;
    isCancel: boolean = false;

    constructor(private flashMessageService: FlashMessageService, private categoryDetailsService: CategoryDetailsService, private activatedRoute: ActivatedRoute, private router: Router, public matDialog: MatDialog, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.buildForm();
            this.id = this.activatedRoute.snapshot.params['id'];
            this.categoryForm.setValue(this.categoryDetailsService.sampleCategory())
            if (this.id !== 'new')
                this.getCategoryDetails();
            else
                this.categoryName = "New Category";
        });
    }

    getCategoryDetails() {
        this.categoryDetailsService.getCategoryDetails(this.id).subscribe(category => {
            this.categoryForm.patchValue(category);
            this.categoryName = this.categoryForm.value.name;
        });
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.categoryForm.status === "VALID") {
            if (this.categoryForm.value._id)
                this.updateCategory();
            else
                this.createCategory();
        }
    }

    createCategory() {
        this.categoryDetailsService.createCategoryDetails(this.categoryForm.value).subscribe(category => {
            this.categoryForm.patchValue(category);
            if (!this.toState)
                this.toState = '/app/medicine/category/details/' + this.categoryForm.value._id;
            this.isCancel = true;
            this.alertSuccess('Created successfully');
        }, (error) => {
            if (error && error.code === 11000) {
                this.isNameError();
            }
        });
    }

    updateCategory() {
        if (this.categoryForm.dirty) {
            this.categoryDetailsService.updateCategoryDetails(this.categoryForm.value).subscribe(category => {
                this.categoryForm.patchValue(category);
                this.alertSuccess('Updated successfully');
                this.categoryForm.markAsPristine();
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
                this.deleteCategory();
            }
        });
    }

    deleteCategory() {
        let id = this.categoryForm.value._id;
        this.categoryDetailsService.deleteCategory(id).subscribe(res => {
            this.router.navigate(['/app/medicine/category/list']);
        });
    }

    buildForm() {
        this.categoryForm = this.formBuilder.group({
            _id: '',
            name: ['', Validators.compose([Validators.required])],
            description: '',
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
        if (this.categoryForm.dirty && this.categoryForm.status === "VALID" && !this.isCancel) {
            let matDialog = this.matDialog.open(ModelDialogComponent, {
                disableClose: true,
                data: { type: 'save' }
            });
            matDialog.afterClosed().subscribe(isSave => {
                if (isSave) {
                    this.toState = next.url;
                    this.onSubmit();
                } else {
                    this.categoryForm.markAsPristine();
                    this.goToState(next.url);
                }
            });
        } else if (this.categoryForm.status !== "VALID" && !this.isCancel) {
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

    goToState(state: string) {
        this.isCancel = true;
        this.router.navigate([state]);
    }
}
