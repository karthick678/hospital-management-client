import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [DashboardService]
})

export class DashboardComponent {
    documents = { "doctor": 0, "doctorActive": 0, "patient": 0, "patientActive": 0, "stock": 0, "stockActive": 0, "category": 0, "categoryActive": 0 };
    bloodGroups = { "oPositive": 0, "oNegative": 0, "aPositive": 0, "aNegative": 0, "bPositive": 0, "bNegative": 0, "abPositive": 0, "abNegative": 0 };
    medicines: any = [];
    activites: any = [];

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.getDoumentsCount();
        this.getBloodGroupCount();
        this.getExpiredMedicines();
        this.getRecentActivities();
    }

    getDoumentsCount() {
        this.dashboardService.getDoumentsCount().subscribe(documents => {
            this.documents = documents;
        });
    }

    getBloodGroupCount() {
        this.dashboardService.getBloodGroupCount().subscribe(bloodGroups => {
            this.bloodGroups = bloodGroups;
        });
    }

    getExpiredMedicines() {
        let date = new Date();
        this.dashboardService.getExpiredMedicines(date).subscribe(medicines => {
            this.medicines = medicines;
        });
    }
 
    getRecentActivities() {
        this.dashboardService.getRecentActivities().subscribe(activites => {
            this.activites = activites;
        });
    }
}