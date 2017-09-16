import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Category } from './../../shared/category.model';
import { AppSettings } from '../../../app.settings';

@Injectable()
export class CategoryDetailsService {

    constructor(private http: Http) {
    }

    sampleCategory() {
        let category = {
            _id: '',
            name: '',
            status: true,
            description: ''
        }
        return category;
    }

    getCategoryDetails(id: string): Observable<Category> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getCategoryDetails/' + id)
            .map((res) => res.json());
    }

    createCategoryDetails(category: Category): Observable<Category> {
        return this.http.post(AppSettings.API_ENDPOINT + '/createCategoryDetails', category)
            .map((res) => res.json());
    }

    updateCategoryDetails(category: Category): Observable<Category> {
        return this.http.put(AppSettings.API_ENDPOINT + '/updateCategoryDetails/' + category._id, category)
            .map((res) => res.json());
    }

    deleteCategory(id: string) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/deleteCategory/' + id)
            .map((res) => res.json());
    }
}