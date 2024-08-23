import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const PHInput = ({
  placeholder,
  type = "text",
  name,
  label,
  errorMsg,
  defaultValue,
  required = true,
}: {
  defaultValue?: string;
  placeholder: string;
  label: string;
  name: string;
  errorMsg: null | string;
  type: string;
  required?: boolean;
}) => {
  return (
    <div className="mt-4">
      <Controller
        defaultValue={defaultValue}
        name={name}
        rules={{
          required: required && (errorMsg || `${label} is required`),
        }}
        render={({ field, fieldState }) => {
          return (
            <Form.Item
              label={label}
              validateStatus={fieldState.error ? "error" : ""}
              help={fieldState.error ? fieldState.error.message : ""}
            >
              {type === "text" ? (
                <Input
                  {...field}
                  placeholder={placeholder}
                  size="large"
                  id={name}
                />
              ) : (
                <Input.Password
                  {...field}
                  size="large"
                  placeholder={placeholder}
                  id={name}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              )}
            </Form.Item>
          );
        }}
      />
    </div>
  );
};

export default PHInput;
