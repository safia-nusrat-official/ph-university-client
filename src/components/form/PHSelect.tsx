import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { SelectProps } from "../../types/PHSelect.types";

const PHSelect = ({
  name,
  label,
  options,
  placeholder,
  disabled,
  defaultValue,
  required,
}: SelectProps) => {
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: required && `${label} is required.`,
      }}
      render={({ field, fieldState }) => (
        <Form.Item
          label={label}
          validateStatus={fieldState.error ? "error" : ""}
          help={fieldState.error ? fieldState.error.message : ""}
        >
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
