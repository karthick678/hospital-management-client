import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
var companyData = [
    {
        "id": 1,
        "name": "Ethel Price",
        "gender": "female",
        "company": "Johnson, Johnson and Partners, LLC CMP DDC",
        "age": 22
    },
    {
        "id": 2,
        "name": "Claudine Neal",
        "gender": "female",
        "company": "Sealoud",
        "age": 55
    },
    {
        "id": 3,
        "name": "Beryl Rice",
        "gender": "female",
        "company": "Velity",
        "age": 67
    }
];

@Injectable()
export class PatientListService {
    public getPatients() {
        return companyData;
    }
}