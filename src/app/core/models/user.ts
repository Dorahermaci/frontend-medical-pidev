import { AppUserRole } from "./appuserrole";

export class AppUser {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  password!: string;
  code!: string;
  phonenumber!: string;
  cin!: number;
  job!: string;
  appUserRole!: AppUserRole;
  locked!: boolean;
  enabled!: boolean;
}
