import { TAcademicSemester } from "../../../../types/academicSemester";
import { Card } from "antd";

const SemesterCard = ({ data }: { data: TAcademicSemester }) => {
  const { name, year, code, startMonth, endMonth } = data;
  return (
    <Card title={`${name} ${year}`} bordered={true}>
      <div className="flex justify-between">
        <span>
          {startMonth} - {endMonth}
        </span>
        <span className="font-medium">{code}</span>
      </div>
    </Card>
  );
};

export default SemesterCard;
