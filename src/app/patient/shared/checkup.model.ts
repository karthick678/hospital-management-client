export class Checkup {
    _id: string = '';
    patientId: String = '';
    doctorId: string = '';
    symptoms: string = '';
    diagnosis: string = '';
    checkupDate:  Date;
    prescription: Prescription[];
    extraNotes: string = '';
}

class  Prescription {
    stockId: string;
    noOfDays: number;
    whenToTake: string;
    beforeMeal: boolean;
}