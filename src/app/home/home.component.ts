import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    isShowUserProfile: boolean = false;

    constructor(private router: Router) {
    }

    userProfileOpen(userProfile: any) {
        this.isShowUserProfile = !this.isShowUserProfile;
        this.isShowUserProfile ? userProfile.open() : userProfile.close();
    }

    logout() {
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/login']);
    }
}