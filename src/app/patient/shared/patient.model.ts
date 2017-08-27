export class Patient {
    id: number;
    name: string;
    gender: string;
    company: string;
    age: number
    constructor(id: number, name: string, gender: string, company: string, age: number) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.company = company;
        this.age = age;
    }
}