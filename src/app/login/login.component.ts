import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
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
    isLoginError: boolean = false;
    formSubmitAttempt: boolean = false;
    authForm: FormGroup;

    constructor(private router: Router, private loginService: LoginService, private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.buildForm();
    }

    onSubmit() {
        this.formSubmitAttempt = true;
        if (this.authForm.status === "VALID") {
            this.loginService.signIn(this.authForm.value).subscribe(user => {
                if (user && user.success) {
                    if (typeof (Storage) !== "undefined") {
                        let currentUser: any = { id: user.id, name: user.name, email: user.email, token: user.token };
                        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                        this.headers.append('Authorization', JSON.parse(sessionStorage.getItem('currentUser')).token);
                        this.router.navigate(['/app/dashboard']);
                    }
                } else {
                    this.isLoginError = true;
                }
            });
        }
    }

    buildForm() {
        this.authForm = this.formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern("[^ @]*@[^ @]*")])],
            password: ['', Validators.compose([Validators.required])]
        });
    }

    isFieldValid(field: string) {
        return (!this.authForm.get(field).valid && this.authForm.get(field).touched) ||
            (this.authForm.get(field).untouched && this.formSubmitAttempt);
    }

    showLoginForm() {
        this.isLoginError = !this.isLoginError;
    }
}