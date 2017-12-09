import { Component } from '@angular/core';
import { UserDetailsService } from './user-profile.service';

@Component({
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    providers: [UserDetailsService]
})

export class UserProfileComponent {
    user = {
        name: '',
        email: '',
        mobileNumber: ''
    }

    constructor(private userDetailsService: UserDetailsService) {

    }

    ngOnInit() {
        if (sessionStorage.getItem('currentUser')) {
            let userId = JSON.parse(sessionStorage.getItem('currentUser')).id;
            this.getUserDetails(userId);
        }
    }

    getUserDetails(userId: string) {
        this.userDetailsService.getUserDetails(userId).subscribe(user => {
            this.user = user;
        });
    }
}