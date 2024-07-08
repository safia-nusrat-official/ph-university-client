import { useForm } from "react-hook-form";

import React, { useState } from "react";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();
  const [errorMsg, setErrorMsg] = useState<null | string>(null);
  const [login, { isSuccess, isLoading, isError }] = useLoginMutation();
  const onSubmit = async (inputData: any) => {
    try {
      console.log(isLoading && "Loading....");
      setErrorMsg(null);
      const res = await login(inputData).unwrap();
      console.log(res);

      if (!res.success) {
        setErrorMsg(res.message || "Unexpected Error");
      }
      console.log(isSuccess && "Logged In successfully.");

      const token = res.data.access_token;
      const user = verifyToken(res.data.access_token);

      dispatch(
        setUser({
          token,
          user,
        })
      );
    } catch (err: any) {
      console.log(err);
      setErrorMsg(err?.data?.message || "Unexpected Error");
    }
  };
  return (
    <div className="mx-auto md:w-1/3 md:p-0 px-8 flex justify-center flex-col  h-screen ">
      <h1 className="text-4xl text-center mb-6 font-bold">Login</h1>
      <form className="font-inter" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative w-full flex my-4">
          <input
            type="text"
            required
            placeholder="Enter your official Id"
            className="p-[.75rem] w-full outline-none active:border-blue-500 rounded-md border-zinc-400 border-[1.58px] focus:border-blue-500"
            {...register("userId", {})}
          />
          <label
            htmlFor="id"
            className="absolute -top-6 font-medium text-blue-500"
          >
            User Id
          </label>
        </div>

        {errorMsg && (
          <span className="mb-4 font-medium text-red-600">{errorMsg}</span>
        )}

        <div className="relative w-full flex my-8">
          <input
            required
            type="text"
            placeholder="Enter your password"
            className="p-[.75rem] w-full outline-none active:border-blue-500 rounded-md border-zinc-400 border-[1.58px] focus:border-blue-500"
            {...register("password", {})}
          />
          <label
            htmlFor="id"
            className="absolute -top-6 font-medium text-blue-500"
          >
            Password
          </label>
        </div>
        <button
          type="submit"
          className="py-[0.5rem] px-6 bg-blue-500 text-white rounded-md font-semibold "
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
