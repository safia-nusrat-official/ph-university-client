import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCreateAcademicFacultyMutation } from "../../../../redux/features/adminFeatures/academicManagement/academicFaculty";
import { TAcademicFaculty } from "../../../../types/academicFaculty.types";
import { TReduxResponse } from "../../../../types/global.types";
import { toast } from "sonner";
import { Button, Modal } from "antd";
import PHForm from "../../../../components/form/PHForm";
import PHSelect from "../../../../components/form/PHSelect";
import { academicFacultyOptions } from "../../../../consts/academicFaculty.constants";
import { useState } from "react";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty, { isLoading }] =
    useCreateAcademicFacultyMutation();

  const handleSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const academicFaculty: TAcademicFaculty = {
      name: data.name,
    };
    try {
      const result = (await createAcademicFaculty(
        academicFaculty
      )) as TReduxResponse<TAcademicFaculty>;
      console.log(result);

      if (result.error) {
        console.log(result.error.data.message);
        toast.error(result.error.data.message);
      } else if (result?.success) {
        toast.success(result.message);
        setIsModalOpen(false);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Create Academic Faculty
      </Button>
      <Modal
        title="Create a new Academic Faculty"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHSelect
            name="name"
            label="Academic Faculty Name"
            options={academicFacultyOptions}
          ></PHSelect>
          <Button
            loading={isLoading}
            htmlType="submit"
            className="mb-6 font-semibold"
            type="primary"
          >
            Create Semester
          </Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default CreateAcademicFaculty;
