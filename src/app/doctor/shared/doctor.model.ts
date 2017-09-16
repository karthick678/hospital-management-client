export class Doctor {
    _id: string;
    name: Name;
    email: string;
    gender: string;
    mobileNumber: string;
    phoneNumber: string;
    status: boolean;
    constructor(_id: string, first: string, middle: string, last: string, gender: string, mobileNumber: string, phoneNumber: string, status: boolean) {
        this._id = _id;
        this.name.first = first;
        this.name.middle = middle;
        this.name.last = last;
        this.gender = gender;
        this.mobileNumber = mobileNumber;
        this.phoneNumber = phoneNumber;
        this.status = status
    }
}

class Name {
    first: string;
    middle: string;
    last: string;
}
