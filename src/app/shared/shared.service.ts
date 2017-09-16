import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    constructor() {
    }
    getPageSizeList() {
        let page = [
            { name: 5, value: 5 },
            { name: 'Default (8)', value: 8 },
            { name: 10, value: 10 },
            { name: 20, value: 20 },
            { name: 30, value: 30 },
            { name: 50, value: 50 },
            { name: 100, value: 100 },
            { name: 200, value: 200 },
            { name: 500, value: 500 }
        ];
        return page;
    }
}