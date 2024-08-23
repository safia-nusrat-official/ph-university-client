import { Button, Col, Divider, Form, Input, Row, Upload } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHForm from "../../../components/form/PHForm";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import SectionTitle from "../../../components/shared/SectionTitle";
import PHDate from "../../../components/form/PHDate";
import PHRadio from "../../../components/form/PHRadio";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions } from "../../../consts/user.constants";
import { useGetAllSemestersQuery } from "../../../redux/features/adminFeatures/academicManagement/academicSemester";
import { SelectOptions } from "../../../types/PHSelect.types";
import { TAcademicSemester } from "../../../types/academicSemester.types";
import { useGetAllDepartmentsQuery } from "../../../redux/features/adminFeatures/academicManagement/academicDepartment";
import { TAcademicDepartment } from "../../../types/academicDepartment.types";
import { useCreateStudentMutation } from "../../../redux/features/adminFeatures/userManagement/user.api";
import { toast } from "sonner";
import { TStudent } from "../../../types/user/student.types";
import moment from "moment";
import { TReduxResponse, TSuccessResponse } from "../../../types/global.types";

const CreateStudent = () => {
  const { data: SemesterData, isLoading: semesterLoading } =
    useGetAllSemestersQuery([{ name: "limit", value: "0" }]);
  const { data: DepartmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery([{ name: "limit", value: "0" }]);
  const [createStudent, { isLoading: studentLoading }] =
    useCreateStudentMutation();

  const semesterOptions: SelectOptions =
    (SemesterData?.data &&
      SemesterData.data.map((semester: TAcademicSemester) => ({
        label: `${semester.name} ${semester.year} ( ${semester.startMonth} - ${semester.endMonth} )`,
        value: semester._id as string,
      }))) ||
    [];

  const departmentOptions: SelectOptions =
    (DepartmentData?.data &&
      DepartmentData.data.map((department: TAcademicDepartment) => ({
        label: `${department.name}`,
        value: department._id as string,
      }))) ||
    [];

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    const { profileImage, ...studentData } = data;
    const form = new FormData();
    const student = {
      password: "Student123!",
      studentData: {
        ...studentData,
        dateOfBirth: moment((studentData as TStudent).dateOfBirth).format(
          "YYYY-MM-DD"
        ),
        emergencyContactNo: [studentData.emergencyContactNo],
      },
    };

    form.append("data", JSON.stringify(student));
    form.append("image", profileImage);

    console.log(form.get("data"))
    console.log(form.get("image"))

    try {
      const result = (await createStudent(form)) as TReduxResponse<TStudent>;

      if (result.error) {
        console.log(result.error);
        toast.error(result.error.data.message);
      } else if (result.data) {
        console.log(result.data);
        toast.success(result.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error occured!");
    }
  };

  const defaultStudentData = {
    name: {
      firstName: "Safia",
      middleName: "Nusrat",
      lastName: "Anisha",
    },
    gender: "female",
    dateOfBirth: "2009-09-11T17:00:00.000Z",
    email: "safia.nusrat.official@gmail.com",
    contactNo: "01715785584",
    emergencyContactNo: "0175339935",
    presentAddress: "Mirpur-12, Dhaka-1216",
    permanentAddress: "Mirpur-12, Dhaka-1216",
    fatherName: "Abdus Sattar",
    motherName: "Ammayeasifun",
    fatherOccupation: "Manager",
    fatherContactNo: "01715785584",
    motherOccupation: "Teacher",
    motherContactNo: "01935685043",
  };

  return (
    <div>
      <SectionTitle>Add a Student</SectionTitle>
      <PHForm onSubmit={handleSubmit}>
        <Divider>Personal Information</Divider>
        <Row gutter={8}>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="First Name is required!"
              label="First Name"
              placeholder="Enter your first name"
              name="name.firstName"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Middle Name is required!"
              label="Middle Name"
              placeholder="Enter your middle name"
              name="name.middleName"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Last Name is required!"
              label="Last Name"
              placeholder="Enter your last name"
              name="name.lastName"
            ></PHInput>
          </Col>
        </Row>
        <Row gutter={8} justify={"center"}>
          <Col span={8}>
            <PHRadio
              label="Gender"
              name="gender"
              radios={[
                { text: "Male", value: "male" },
                { text: "Female", value: "female" },
              ]}
              defaultValue="female"
            ></PHRadio>
          </Col>
          <Col span={8} className="relative -top-4">
            <PHDate required label="Birthdate" name="dateOfBirth"></PHDate>
          </Col>
          <Col span={8}>
            <PHSelect
              required={true}
              label="Blood Group"
              name="bloodGroup"
              options={bloodGroupOptions}
            ></PHSelect>
          </Col>
        </Row>

        <Divider>Contact Information</Divider>
        <Row gutter={8}>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Email is required!"
              label="Email"
              placeholder="Enter your Email"
              name="email"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Contact No. is required!"
              label="Contact No."
              placeholder="Enter your Contact Number"
              name="contactNo"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
            type="text"
              errorMsg="Emergency Contact No is required!"
              label="Emergency Contact No"
              placeholder="Enter your Emergency Contact Number"
              name="emergencyContactNo"
            ></PHInput>
          </Col>
        </Row>
        <Row gutter={8} justify={"center"}>
          <Col span={8}>
            <Controller
              name="profileImage"
              rules={{
                required: "Profile Image is required.",
              }}
              render={({
                field: { value, onChange, ...field },
                fieldState,
              }) => (
                <Form.Item
                  className="mt-4"
                  label="Profile Photo"
                  validateStatus={fieldState.error ? "error" : ""}
                  help={fieldState.error ? fieldState.error?.message : ""}
                >
                  <Input
                    {...field}
                    value={value?.fileName}
                    type="file"
                    onChange={(e) => onChange(e.target.files?.[0])}
                  ></Input>
                  {/* <Upload
                  style={{width:"100%"}}
                    {...field}
                    fileList={
                      value
                        ? [{ uid: "-1", name: value.name, status: "done" }]
                        : []
                    }
                    beforeUpload={(file) => {
                      onChange(file);
                      return false; // Prevent automatic upload
                    }}
                    onRemove={() => onChange(null)}
                  >
                    <Button type="primary">Upload Image</Button>
                  </Upload> */}
                </Form.Item>
              )}
            />
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Present Address is required!"
              label="Present Address"
              placeholder="Enter your Present Address"
              name="presentAddress"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Permanent Address is required!"
              label="Permanent Address"
              placeholder="Enter your Permanent Address"
              name="permanentAddress"
            ></PHInput>
          </Col>
        </Row>
        <Divider>Guardian Information</Divider>
        <Row gutter={8}>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Father's Name is required!"
              label="Father's Name"
              placeholder="Enter your Father's Name"
              name="guardians.fatherName"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Mother's Name is required!"
              label="Mother's Name"
              placeholder="Enter your Mother's Name"
              name="guardians.motherName"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Father's Occupation is required!"
              label="Father's Occupation"
              placeholder="Enter your Father's Occupation"
              name="guardians.fatherOccupation"
            ></PHInput>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Father's Contact No is required!"
              label="Father's Contact No"
              placeholder="Enter your Father's Contact Number"
              name="guardians.fatherContactNo"
            ></PHInput>
          </Col>

          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Mother's Occupation is required!"
              label="Mother's Occupation"
              placeholder="Enter your Mother's Occupation"
              name="guardians.motherOccupation"
            ></PHInput>
          </Col>
          <Col span={8}>
            <PHInput
              type="text"
              errorMsg="Mother's Contact No is required!"
              label="Mother's Contact No"
              placeholder="Enter your Mother's Contact Number"
              name="guardians.motherContactNo"
            ></PHInput>
          </Col>
        </Row>

        <Divider>Academic Information</Divider>
        <Row gutter={10}>
          <Col span={12}>
            <PHSelect
              disabled={semesterLoading}
              options={semesterOptions}
              required
              placeholder="Enter the admission semester"
              name="admissionSemester"
              label="Admission Semester"
            ></PHSelect>
          </Col>
          <Col span={12}>
            <PHSelect
              required
              disabled={departmentLoading}
              options={departmentOptions}
              placeholder="Enter the Academic Department"
              name="academicDepartment"
              label="Academic Department"
            ></PHSelect>
          </Col>
        </Row>
        <Button
          loading={studentLoading}
          disabled={(semesterLoading && departmentLoading) || studentLoading}
          className="mb-12 mt-6"
          type="primary"
          htmlType="submit"
        >
          Submit
        </Button>
      </PHForm>
    </div>
  );
};

export default CreateStudent;
