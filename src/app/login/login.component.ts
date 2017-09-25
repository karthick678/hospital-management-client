import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from './login.service';



@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [LoginService]
})

export class LoginComponent {
    private headers = new HttpHeaders();
    user = {
        email: '',
        password: ''
    };

    constructor(private router: Router, private loginService: LoginService) {

    }

    onSubmit() {
        this.loginService.signIn(this.user).subscribe(user => {
            if (user && user.success) {
                if (typeof (Storage) !== "undefined") {
                    let currentUser: any = { name: user.name, email: user.email, token: user.token };
                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                    this.headers.append('Authorization', JSON.parse(sessionStorage.getItem('currentUser')).token);
                    this.router.navigate(['/app/dashboard']);
                }
            }
        });
    }
}