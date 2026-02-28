import React from "react";

import ForgetPasswordForm from "../components/ForgetPasswordForm";
const ForgetPassword = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" w-md p-6 rounded-lg shadow-md border ">
        <div className=" text-center border-b-[3px] pb-4">
          <h1 className="text-4xl font-semibold text-blue-950">
            Forget Password
          </h1>
        </div>
        <ForgetPasswordForm />
      </div>
    </div>
  );
};

export default ForgetPassword;
