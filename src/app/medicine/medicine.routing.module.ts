import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicineComponent } from './medicine.component';
import { MedicineStockComponent } from './stock/medicine.stock.component';
import { StockListComponent } from './stock/list/stock.list.component';
import { StockDetailsComponent } from './stock/details/stock.details.component';
import { MedicineCategoryComponent } from './category/medicine.category.component';
import { CategoryListComponent } from './category/list/category.list.component';
import { CategoryDetailsComponent } from './category/details/category.details.component';

const medicineRoutes: Routes = [
    {
        path: 'medicine',
        component: MedicineComponent,
        children: [
            { path: '', redirectTo: 'stock', pathMatch: 'full' },
            {
                path: 'stock',
                component: MedicineStockComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list',
                        component: StockListComponent,
                    },
                    { path: 'details/:id', component: StockDetailsComponent },
                ]
            },
            {
                path: 'category', component: MedicineCategoryComponent,
                children: [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    {
                        path: 'list',
                        component: CategoryListComponent,
                    },
                    { path: 'details/:id', component: CategoryDetailsComponent },
                ]
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(medicineRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class MedicineRoutingModule { }
