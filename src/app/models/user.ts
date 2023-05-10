import { AppUserRole } from "./appuserrole";

export interface AppUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  code: string;
  phoneNumber: string;
  CIN: number;
  job: string;
  appUserRole: AppUserRole;
  locked: boolean;
  enabled: boolean;
}
