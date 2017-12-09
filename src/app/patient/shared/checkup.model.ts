export class Checkup {
    _id: string = '';
    patientId: String = '';
    doctorName: string = '';
    symptoms: string = '';
    diagnosis: string = '';
    checkupDate:  Date;
    prescription: Prescription[];
    extraNotes: string = '';
}

class  Prescription {
    medicine: string;
    noOfDays: number;
    whenToTake: string;
    beforeMeal: boolean;
}