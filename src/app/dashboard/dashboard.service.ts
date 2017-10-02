import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';
import { HttpClient } from './../guard/http.client';

@Injectable()
export class DashboardService {
    constructor(private http: HttpClient) {
    }

    getDoumentsCount(): Observable<any> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getDoumentsCount')
            .map((res) => res.json());
    }

    getBloodGroupCount(): Observable<any> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getBloodGroupCount')
            .map((res) => res.json());
    }

    getRecentActivities(): Observable<any> {
        return this.http.get(AppSettings.API_ENDPOINT + '/getRecentActivities')
            .map((res) => this.prepareRecentActivities(res.json()));
    }

    getExpiredMedicines(date: Date): Observable<any> {
        return this.http.post(AppSettings.API_ENDPOINT + '/getExpiredMedicines', { 'expireDate': date })
            .map((res) => res.json());
    }

    prepareRecentActivities(activities: any): Observable<any> {
        let recentActivities: any = [];
        if (activities.length) {
            let activitiesLength = activities.length,
                collectionTypes = ['Doctor', 'Patient', 'Checkup', 'Category', 'Stock'],
                activitiesInfo = [{
                    name: '',
                    collectionType: 'Doctor',
                    icon: 'group_add',
                    listUrl: '/app/doctor/list',
                    detailsUrl: '/app/doctor/details/',
                    action: '',
                    createdAt: ''
                }, {
                    name: '',
                    collectionType: 'Patient',
                    icon: 'perm_identity',
                    listUrl: '/app/patient/list',
                    detailsUrl: '/app/patient/details/',
                    action: '',
                    createdAt: ''
                }, {
                    name: '',
                    collectionType: 'Checkup',
                    icon: 'accessibility',
                    listUrl: '/app/patient/report/',
                    detailsUrl: '/app/patient/checkup/',
                    action: '',
                    createdAt: ''
                }, {
                    name: '',
                    collectionType: 'Category',
                    icon: 'local_offer',
                    listUrl: '/app/medicine/category/list',
                    detailsUrl: '/app/medicine/category/details/',
                    action: '',
                    createdAt: ''
                }, {
                    name: '',
                    collectionType: 'Stock',
                    icon: 'local_pharmacy',
                    listUrl: '/app/medicine/stock/list',
                    detailsUrl: '/app/medicine/stock/details/',
                    action: '',
                    createdAt: ''
                }];
            for (let key = 0; key < activitiesLength; key++) {
                let collectionTypeIndex = collectionTypes.indexOf(activities[key].collectionType);
                let activityInfo = JSON.parse(JSON.stringify(activitiesInfo[collectionTypeIndex]));
                let detailsUrl = activityInfo.detailsUrl;
                if (activities[key].collectionType === 'Patient' || activities[key].collectionType === 'Doctor') {
                    activityInfo.name = activities[key].referenceDocument.name.first;
                    activityInfo.detailsUrl = detailsUrl + activities[key].referenceDocument._id;
                }
                else if (activities[key].collectionType === 'Checkup') {
                    activityInfo.name = activities[key].referenceDocument.symptoms;
                    activityInfo.detailsUrl =  detailsUrl + activities[key].referenceDocument.patientId +'/'+ activities[key].referenceDocument._id;
                    activityInfo.listUrl =  activityInfo.listUrl + activities[key].referenceDocument.patientId;
                }
                else {
                    activityInfo.name = activities[key].referenceDocument.name;
                    activityInfo.detailsUrl = detailsUrl + activities[key].referenceDocument._id;
                }
                activityInfo.action = activities[key].action;
                activityInfo.createdAt = activities[key].createdAt;
                recentActivities.push(activityInfo);
            }
            return recentActivities;
        } else {
            return activities;
        }
    }
}

