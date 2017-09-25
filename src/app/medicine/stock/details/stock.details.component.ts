import { Component } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { MdDialog } from '@angular/material';
import { StockDetailsService } from './stock.details.service';
import { Stock } from './../../shared/stock.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModelDialogComponent } from './../../../shared/model-dialog/model-dialog.component';

@Component({
    selector: 'stock-details',
    templateUrl: './stock.details.component.html',
    styleUrls: ['./stock.details.component.scss'],
    providers: [StockDetailsService]
})

export class StockDetailsComponent {
    stock: Stock;
    id: string;
    stockName: string;
    categoriesList = [{ name: 'Analgesico', value: 'Analgesico' }];

    constructor(public snackBar: MdSnackBar, private stockDetailsService: StockDetailsService, private activatedRoute: ActivatedRoute, private router: Router, public mdDialog: MdDialog) {
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.id = this.activatedRoute.snapshot.params['id'];
            this.stock = this.stockDetailsService.sampleStock();
            if (this.id !== 'new')
                this.getStockDetails();
            else
                this.stockName = "New Stock";
        });
    }

    getStockDetails() {
        this.stockDetailsService.getStockDetails(this.id).subscribe(stock => {
            this.stock = stock;
            this.stockName = this.stock.name;
        });
    }

    onSubmit() {
        if (this.stock._id)
            this.updateStock();
        else
            this.createStock();
    }

    createStock() {
        this.stockDetailsService.createStockDetails(this.stock).subscribe(stock => {
            this.stock = stock;
            this.router.navigate(['/app/medicine/stock/details/' + this.stock._id]);
        });
    }

    updateStock() {
        this.stockDetailsService.updateStockDetails(this.stock).subscribe(stock => {
            this.stock = stock;
            this.snackBar.open('Update Successfully!', '', {
                duration: 1000,
                extraClasses: ['success-snackbar']
            });
        });
    }

    deleteConfirm() {
        let mdDialog = this.mdDialog.open(ModelDialogComponent);
        mdDialog.afterClosed().subscribe(isDelete => {
            if (isDelete) {
                this.deleteStock();
            }
        });
    }

    deleteStock() {
        let id = this.stock._id;
        this.stockDetailsService.deleteStock(id).subscribe(res => {
            this.router.navigate(['/app/medicine/stock/list']);
        });
    }
}
