import { Form, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { SelectProps } from "../../types/PHSelect.types";

const PHSelect = ({
  name,
  label,
  options,
  placeholder,
  disabled,
  defaultValue,
}: SelectProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            disabled={disabled}
            size="large"
            placeholder={
              placeholder ? `Select ${placeholder}` : `Select ${label}`
            }
            onChange={field.onChange}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
