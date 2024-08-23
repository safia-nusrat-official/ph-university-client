import { DatePicker, Form, Radio } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

type RadioOption = {
  value: string;
  text: string;
};
interface RadioProps {
  label: string;
  name: string;
  radios: RadioOption[];
  defaultValue?: RadioOption["value"];
}

const PHRadio = ({ name, label, radios, defaultValue }: RadioProps) => {
  return (
    <div>
      <Controller
        name={name}
        defaultValue={defaultValue}
        render={({ field }) => {
          return (
            <Form.Item label={label}>
              <Radio.Group {...field} onChange={field.onChange}>
                {radios.map((radio) => (
                  <Radio value={radio.value}>{radio.text}</Radio>
                ))}
              </Radio.Group>
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHRadio;
