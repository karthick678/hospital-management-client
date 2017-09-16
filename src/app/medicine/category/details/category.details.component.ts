import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { CategoryDetailsService } from './category.details.service';
import { Category } from './../../shared/category.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
    selector: 'category-details',
    templateUrl: './category.details.component.html',
    styleUrls: ['./category.details.component.scss'],
    providers: [CategoryDetailsService]
})

export class CategoryDetailsComponent {
    category: Category;
    id: string;
    categoryName: string;

    constructor(public snackBar: MdSnackBar, private categoryDetailsService: CategoryDetailsService, private activatedRoute: ActivatedRoute, private router: Router) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = this.activatedRoute.snapshot.params['id'];
            this.category = this.categoryDetailsService.sampleCategory();
            if (this.id !== 'new')
                this.getCategoryDetails();
            else
                this.categoryName = "New Category";
        });
    }

    getCategoryDetails() {
        this.categoryDetailsService.getCategoryDetails(this.id).subscribe(category => {
            this.category = category;
            this.categoryName = this.category.name;
        });
    }

    onSubmit() {
        if (this.category._id)
            this.updateCategory();
        else
            this.createCategory();
    }

    createCategory() {
        this.categoryDetailsService.createCategoryDetails(this.category).subscribe(category => {
            this.category = category;
            this.router.navigate(['/medicine/category/details/' + this.category._id]);
        });
    }

    updateCategory() {
        this.categoryDetailsService.updateCategoryDetails(this.category).subscribe(category => {
            this.category = category;
            this.snackBar.open('Update Successfully!', '', {
                duration: 1000,
                extraClasses: ['success-snackbar']
            });
        });
    }
}
