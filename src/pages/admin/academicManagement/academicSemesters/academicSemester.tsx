import { useGetAllSemestersQuery } from "../../../../redux/features/academicSemester/academicSemester";
import { TAcademicSemester } from "../../../../types/academicSemester";
import SemesterCard from "./semesterCard";

const AcademicSemester = () => {
  const { data, isLoading } = useGetAllSemestersQuery(null);
  const semesters = !isLoading && data?.data;
  return (
    <div>
      <h2 className="mb-6 text-4xl font-bold">Academic Semester</h2>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {semesters &&
          semesters.map((semester: TAcademicSemester) => (
            <SemesterCard data={semester}></SemesterCard>
          ))}
      </div>
    </div>
  );
};

export default AcademicSemester;
