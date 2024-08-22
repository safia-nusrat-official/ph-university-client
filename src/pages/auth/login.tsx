import { useForm } from "react-hook-form";

import React, { useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser, TUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import PHInput from "../../components/form/PHInput";
import PHForm from "../../components/form/PHForm";
import { Button } from "antd";

const Login = () => {
  const dispatch = useAppDispatch();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (inputData: any) => {
    try {
      if (isLoading) {
        toast.loading("Logging in", {});
      }
      setErrorMsg(null);
      const res = await login(inputData).unwrap();

      if (!res.success || isError) {
        setErrorMsg(res.message || "Unexpected Error");
      }
      toast.success("Logged in successfully.");

      const token = res.data.access_token;
      const user = verifyToken(res.data.access_token) as TUser;

      dispatch(
        setUser({
          token,
          user,
        })
      );
      navigate(`/${user?.role}/dashboard`);
    } catch (err: any) {
      console.log(err);
      setErrorMsg(err?.data?.message || "Unexpected Error");
      toast.error(err?.data?.message);
    }
  };
  return (
    <div className="mx-auto md:w-1/3 md:p-0 px-8 flex justify-center flex-col  h-screen ">
      <h1 className="text-4xl text-center mb-6 font-bold">Login</h1>
      <PHForm onSubmit={onSubmit}>
        <PHInput
          errorMsg={errorMsg}
          label="User Id"
          placeholder="Enter your Official Id"
          name="userId"
          type="text"
        ></PHInput>
        <Toaster
          position="bottom-right"
          visibleToasts={2}
          expand={false}
          duration={2000}
          closeButton={true}
          richColors={true}
        ></Toaster>
        <PHInput
          errorMsg={errorMsg}
          label="Password"
          placeholder="Enter your password"
          name="password"
          type="password"
        ></PHInput>

        <Button
        htmlType="submit"
          size="large"
          type="primary"
          className={`mt-6 font-semibold ${isLoading?"bg-slate-500":""}`}
        >
          Login
        </Button>
      </PHForm>
    </div>
  );
};

export default Login;
