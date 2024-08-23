import PHForm from "../../../../components/form/PHForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import React from "react";
import PHSelect from "../../../../components/form/PHSelect";
import { SelectOptions } from "../../../../types/PHSelect.types";
import { academicSemesterMonths } from "../../../../consts/academicSemester.constants";
import {
  TAcademicSemester,
  TSemesterNames,
} from "../../../../types/academicSemester.types";
import { useCreateAcademicSemesterMutation } from "../../../../redux/features/adminFeatures/academicManagement/academicSemester";
import { toast } from "sonner";
import { TReduxResponse } from "../../../../types/global.types";

const nameOptions: SelectOptions = [
  {
    label: "Autumn",
    value: "01",
  },
  {
    label: "Summer",
    value: "02",
  },
  {
    label: "Spring",
    value: "03",
  },
];
const currentYear = new Date().getFullYear();
const semesterYearOptions = [0, 1, 2, 3, 4]
  .map((item) => item + currentYear)
  .map((item) => ({ label: item.toString(), value: item.toString() }));
const monthOptions = academicSemesterMonths.map((month) => ({
  value: month as string,
  label: month as string,
}));

const CreateAcademicSemester: React.FC = () => {
  const [createAcademicSemester, { isLoading }] =
    useCreateAcademicSemesterMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const semester: TAcademicSemester = {
      name: nameOptions[Number(data.name) - 1].label as TSemesterNames,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semester);
    try {
      const result = (await createAcademicSemester(
        semester
      )) as TReduxResponse<TAcademicSemester>;
      console.log(result);

      if (result.error) {
        console.log(result.error.data.message);
        toast.error(result.error.data.message);
      } else if (result.success) {
        toast.success(result.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={12}>
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            name="name"
            label="Semester Name"
            options={nameOptions}
          ></PHSelect>
          <PHSelect
            name="year"
            label="Semester Year"
            options={semesterYearOptions}
          ></PHSelect>
          <PHSelect
            name="startMonth"
            label="Start Month"
            options={monthOptions}
          ></PHSelect>
          <PHSelect
            name="endMonth"
            label="End Month"
            options={monthOptions}
          ></PHSelect>
          <Button
            loading={isLoading}
            htmlType="submit"
            className="mt-6 font-semibold"
            type="primary"
          >
            Create Semester
          </Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
