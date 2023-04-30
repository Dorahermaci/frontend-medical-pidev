import { AppUser } from './app-user.model';
import { MedicalFolder } from './medical-folder.model';

export class MedicalFile {
  id!: number;
  creationDate!: Date;
  lastModifiedDate!: Date;
  fileName!: string;
  fileType!: string;
  fileUrl!: string;
  patient!: AppUser;
  doctor!: AppUser;
  medicalFolder!: MedicalFolder;

  
}
