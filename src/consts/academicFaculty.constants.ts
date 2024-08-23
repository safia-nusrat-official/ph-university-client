import { SelectOptions } from "../types/PHSelect.types";

export const academicFaculties = [
  "Faculty of Arts and Humanities",
  "Faculty of Social Sciences",
  "Faculty of Science",
  "Faculty of Engineering",
  "Faculty of Medicine and Health Sciences",
  "Faculty of Law",
  "Faculty of Fine Arts",
  "Faculty of Education",
  "Faculty of Information Technology",
  "Faculty of Agriculture and Environmental Sciences",
  "Faculty of Architecture and Urban Planning",
  "Faculty of Communication and Media Studies",
  "Faculty of Psychology",
  "Faculty of International Relations",
];
export const academicFacultyOptions: SelectOptions = academicFaculties.map(
  (item) => ({ label: item, value: item })
);

