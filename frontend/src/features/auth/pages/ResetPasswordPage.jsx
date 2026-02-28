import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
const ResetPassword = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className="flex flex-col gap-4 w-6x1 p-6 rounded-lg shadow-md border ">
        <div className="flex justify-center border-b-[3px] pb-2">
          <h1 className="text-xl font-semibold">Reset Password</h1>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPassword;
