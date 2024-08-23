export interface IUser {
  _id?: string; // mongodb _id
  id?: string; // custom generated id for every user in the application
  email: string;
  password: string;
  needsPasswordChanged?: boolean;
  role: "student" | "admin" | "faculty" | "superAdmin";
  status?: "in-progress" | "blocked";
  isDeleted?: boolean;
  lastPasswordChangedAt?: Date;
}
