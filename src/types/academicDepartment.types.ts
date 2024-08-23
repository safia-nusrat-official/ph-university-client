import { TAcademicFaculty } from "./academicFaculty.types";

export interface TAcademicDepartment {
  name: string;
  academicFaculty: TAcademicFaculty;
  _id?: string;
}
