import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

const PHForm = ({
  children,
  onSubmit,
}: {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
}) => {
  const methods = useForm();

  const submit:SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    methods.reset()
  }
  return (
    <FormProvider {...methods}>
      <Form
        layout="vertical"
        className="font-inter flex flex-col"
        onFinish={methods.handleSubmit(submit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
