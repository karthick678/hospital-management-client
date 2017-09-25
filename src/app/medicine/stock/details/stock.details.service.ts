import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from './../../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { Stock } from './../../shared/stock.model';
import { AppSettings } from '../../../app.settings';

@Injectable()
export class StockDetailsService {

    constructor(private http: HttpClient) {
    }

    sampleStock() {
        let stock = {
            _id: '',
            name: '',
            category: '',
            status: true,
            price: '',
            qty: '',
            genericName: '',
            company: '',
            effects: '',
            expireDate: '',
            description: ''
        }
        return stock;
    }

    getStockDetails(id: string): Observable<Stock> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getStockDetails/' + id)
            .map((res) => res.json());
    }

    createStockDetails(stock: Stock): Observable<Stock> {
        return this.http.post(AppSettings.API_ENDPOINT + '/createStockDetails', stock)
            .map((res) => res.json());
    }

    updateStockDetails(stock: Stock): Observable<Stock> {
        return this.http.put(AppSettings.API_ENDPOINT + '/updateStockDetails/' + stock._id, stock)
            .map((res) => res.json());
    }

    deleteStock(id: string) {
        return this.http.delete(AppSettings.API_ENDPOINT + '/deleteStock/' + id)
            .map((res) => res.json());
    }
}