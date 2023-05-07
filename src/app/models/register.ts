import { AppUser } from "./app-user.model";
import { TrainingCourse } from "./training-course";

export class Register {
  idRegister!: number;
  completionStatus!: boolean;
  startDate!: Date;
  endDate!: Date;
  appUser!: AppUser;
  trainingCourse!: TrainingCourse;
  status!: String;
}
