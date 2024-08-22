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
}: {
  placeholder: string;
  label: string;
  name: string;
  errorMsg: null | string;
  type: string;
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <div className="mt-4">
      <Controller
        name={name}
        render={({ field }) => {
          return (
            <Form.Item label={label}>
              {type === "text" ? (
                <Input
                  {...field}
                  placeholder={placeholder}
                  size="large"
                  required
                  id={name}
                />
              ) : (
                <Input.Password
                  {...field}
                  required
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
