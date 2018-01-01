import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from './../../guard/http.client';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { AppSettings } from '../../app.settings';

@Injectable()
export class MedicineStockComponentService {

    constructor(private http: HttpClient) {
    }

    getAllMedicines(searchQuery: any): Observable<any> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getAllMedicines', searchQuery)
            .map((res) => res.json());
    }
}
