import { Component } from '@angular/core';
import { CategoryListService } from './category.list.service';

import { Category } from './../../shared/category.model';
import { SharedService } from './../../../shared/shared.service';
import { Page } from './../../../patient/shared/page.model';

@Component({
    selector: 'category-list',
    templateUrl: './category.list.component.html',
    styleUrls: ['./category.list.component.scss'],
    providers: [SharedService, CategoryListService]
})

export class CategoryListComponent {
    page = new Page();
    rows = new Array<Category>();
    pageSizeList: any = [];
    searchList = [
        { value: '', viewValue: '-- select --' },
        { value: 'name', viewValue: 'Name' },
        { value: 'status', viewValue: 'Status' },
        { value: 'description', viewValue: 'Description' }
    ];
    searchAttribute: string = '';
    searchText: string = '';

    constructor(private sharedService: SharedService, private categoryListService: CategoryListService) {
        this.pageSizeList = sharedService.getPageSizeList();
        this.page.size = 8;
    }

    ngOnInit() {
        this.setPage({ offset: 0 });
    }

    setPage(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.categoryListService.getCategories(this.page).subscribe(categories => {
            this.rows = categories['docs'];
            this.page.totalElements = categories['total'];
            this.page.totalPages = categories['pages'];
            this.page.size = categories['limit'];
        });
    }

    onSubmit() {
        this.page.query = {};
        if (this.searchText)
            this.page.query[this.searchAttribute] = this.searchText.trim();
        this.setPage({ offset: 0 });
    }
}
