import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class HttpClient {

    constructor(private http: Http, private router: Router) { }

    createAuthorizationHeader(headers: Headers) {
        if (sessionStorage.getItem('currentUser')) {
            let token = JSON.parse(sessionStorage.getItem('currentUser')).token;
            headers.append('Authorization', JSON.parse(sessionStorage.getItem('currentUser')).token);
        }
        else {
            this.router.navigate(['/login']);
        }
    }

    get(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, {
            headers: headers
        });
    }

    post(url: string, data: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(url, data, {
            headers: headers
        });
    }

    put(url: string, data: any) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.put(url, data, {
            headers: headers
        });
    }

    delete(url: string) {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.delete(url, {
            headers: headers
        });
    }
}