import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Page } from './../../../patient/shared/page.model';
import { Category } from './../../shared/category.model';
import { AppSettings } from '../../../app.settings';

@Injectable()
export class CategoryListService {
    constructor(private http: Http) {

    }

    getCategories(page: Page): Observable<Category[]> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getCategories', {
            page: page.pageNumber,
            limit: page.size,
            query: page.query
        })
        .map((res) => res.json());
    }
}