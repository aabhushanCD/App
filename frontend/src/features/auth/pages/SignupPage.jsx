import React from "react";

import SignupForm from "../components/SignupForm";

const Signup = () => {
  return (
    <div className=" flex justify-center items-center h-screen">
      <div className=" gap-4 w-md p-6 rounded-lg shadow-md border ">
        <div className="text-center  border-b-[3px] pb-4">
          <h1 className="text-5xl font-bold text-blue-900">Sign up</h1>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
