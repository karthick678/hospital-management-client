import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Page } from './../../../patient/shared/page.model';
import { Stock } from './../../shared/stock.model';
import { AppSettings } from '../../../app.settings';

@Injectable()
export class StockListService {
    constructor(private http: HttpClient) {

    }
    getStocks(page: Page): Observable<Stock[]> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getStocks', {
            page: page.pageNumber,
            limit: page.size,
            query: page.query
        })
        .map((res) => res.json());
    }
}