import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';

import { MedicineSubmenuComponent } from './shared/medicine-submenu/medicine-submenu.component';
import { MedicineComponent } from './medicine.component';
import { MedicineStockComponent } from './stock/medicine.stock.component';
import { StockListComponent } from './stock/list/stock.list.component';
import { StockDetailsComponent } from './stock/details/stock.details.component';

import { MedicineCategoryComponent } from './category/medicine.category.component';
import { CategoryListComponent } from './category/list/category.list.component';
import { CategoryDetailsComponent } from './category/details/category.details.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule
    ],
    declarations: [
        MedicineSubmenuComponent,
        MedicineComponent,
        MedicineStockComponent,
        StockListComponent,
        StockDetailsComponent,
        MedicineCategoryComponent,
        CategoryListComponent,
        CategoryDetailsComponent
    ],
    exports: [MedicineSubmenuComponent]
})

export class MedicineModule { }

