import { MedicalFolder } from "./medical-folder.model";

export class Appointment {
    id?:string;
    startTime!: Date;
    endTime!: Date;
    medicalFolder!:MedicalFolder


  }
