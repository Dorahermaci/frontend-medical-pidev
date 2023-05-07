import { MedicalFile } from './medical-file.model';
import { AppUser } from './app-user.model';

export class MedicalFolder {
  title!: string;
  hospitalName!: string;
  patient!: { id: number };
  doctor!: { id: number };


}