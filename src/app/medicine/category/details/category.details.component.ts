import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { CategoryDetailsService } from './category.details.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Category } from './../../shared/category.model';
import { ActivatedRoute, Params, Router, Event } from '@angular/router';
import { ModelDialogComponent } from './../../../shared/model-dialog/model-dialog.component';
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
    id: string;
    formSubmitAttempt: boolean = false;
    categoryName: string;
    categoryForm: FormGroup;

    constructor(private flashMessageService: FlashMessageService, private categoryDetailsService: CategoryDetailsService, private activatedRoute: ActivatedRoute, private router: Router, public mdDialog: MdDialog, private formBuilder: FormBuilder) {
        router.events
            .subscribe((event: Event) => {
                // some logic.

            });
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
            this.router.navigate(['/app/medicine/category/details/' + this.categoryForm.value._id]);
            this.alertSuccess('Created successfully');
        });

    }

    updateCategory() {
        if (this.categoryForm.dirty) {
            this.categoryDetailsService.updateCategoryDetails(this.categoryForm.value).subscribe(category => {
                this.categoryForm.patchValue(category);
                this.alertSuccess('Updated successfully');
                this.categoryForm.markAsPristine();
            });
        } else {
            this.alertError();
        }
    }

    deleteConfirm() {
        let mdDialog = this.mdDialog.open(ModelDialogComponent);
        mdDialog.afterClosed().subscribe(isDelete => {
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
    }
}
