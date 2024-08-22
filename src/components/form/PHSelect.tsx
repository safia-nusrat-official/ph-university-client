import { Form, Select } from "antd";
import { Controller } from "react-hook-form";
import { SelectProps } from "../../types/PHSelect.types";

const PHSelect = ({ name, label, options }: SelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { onChange } }) => (
        <Form.Item label={label}>
          <Select
          placeholder={`Select ${label}`}
            onChange={onChange}
            options={options}
          />
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
