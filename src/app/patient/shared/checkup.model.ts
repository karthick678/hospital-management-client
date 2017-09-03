export class Checkup {
    _id: string = '';
    doctorName: string = '';
    symptoms: string = '';
    diagnosis: string = '';
    checkupDate: string = '';
    prescription: Prescription[];
}

export class  Prescription {
    medication: string;
    noOfDays: string;
    whenToTake: string;
    beforeMeal: string;
}