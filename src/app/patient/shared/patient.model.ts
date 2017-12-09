export class Patient {
    _id: string;
    name: Name;
    dob: string;
    gender: string;
    address: Address;
    mobileNumber: string;
    phoneNumber: string;
    bloodGroup: string;
    status: boolean;
    constructor(_id: string, first: string, middle: string, last: string, dob: string, gender: string, address1: string, address2: string, city: string, pincode: string, state: string, mobileNumber: string, phoneNumber: string, bloodGroup: string, status: boolean) {
        this._id = _id;
        this.name.first = first;
        this.name.middle = middle;
        this.name.last = last;
        this.dob = dob;
        this.gender = gender;
        this.address.address1 = address1;
        this.address.address2 = address1;
        this.address.city = city;
        this.address.pincode = pincode;
        this.address.state = state;
        this.mobileNumber = mobileNumber;
        this.phoneNumber = phoneNumber;
        this.bloodGroup = bloodGroup;
        this.status = status;
    }
}

class Name {
    first: string;
    middle: string;
    last: string;
}

class Address {
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
}
