import { Component } from '@angular/core';
import { Stock } from './../../shared/stock.model';
import { StockListService } from './stock.list.service';

import { SharedService } from './../../../shared/shared.service';
import { Page } from './../../../patient/shared/page.model';

@Component({
    selector: 'stock-list',
    templateUrl: './stock.list.component.html',
    styleUrls: ['./stock.list.component.scss'],
    providers: [SharedService, StockListService]
})

export class StockListComponent {
    page = new Page();
    rows = new Array<Stock>();
    pageSizeList: any = [];
    searchList = [
        { value: '', viewValue: '-- select --' },
        { value: 'name', viewValue: 'Name' },
        { value: 'category', viewValue: 'Category' },
        { value: 'price', viewValue: 'Price' },
        { value: 'qty', viewValue: 'Quantity' },
        { value: 'company', viewValue: 'Company' }
    ];
    searchAttribute: string = '';
    searchText: string = '';

    constructor(private sharedService: SharedService, private stockListService: StockListService) {
        this.pageSizeList = sharedService.getPageSizeList();
        this.page.size = 8;
    }

    ngOnInit() {
        this.setPage({ offset: 0 });
    }

    setPage(pageInfo: any) {
        this.page.pageNumber = pageInfo.offset;
        this.stockListService.getStocks(this.page).subscribe(stocks => {
            this.rows = stocks['docs'];
            this.page.totalElements = stocks['total'];
            this.page.totalPages = stocks['pages'];
            this.page.size = stocks['limit'];
        });
    }

    onSubmit() {
        this.page.query = {};
        if (this.searchText)
            this.page.query[this.searchAttribute] = this.searchText.trim();
        this.setPage({ offset: 0 });
    }
}