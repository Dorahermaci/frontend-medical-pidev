import { MedicalFile } from './medical-file.model';
import { AppUser } from './app-user.model';

export class MedicalFolder {
  id?: string | number;
  title!: string;
  hospitalName!: string;
  patient!: { id: number };
  doctor!: { id: number };
  medicalFiles?: MedicalFile[] | undefined;
}
