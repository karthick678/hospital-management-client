import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, LoadChildren, CanLoad } from '@angular/router';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'app',
        pathMatch: 'full'
    }, {
        path: 'login',
        loadChildren: './login/login.module#LoginModule',
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);