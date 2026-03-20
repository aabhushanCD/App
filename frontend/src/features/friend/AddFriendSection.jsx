import React from "react";
import AddFriendCart from "./components/AddFriendCart";

const AddFriendSection = ({ allUsers }) => {
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3  gap-6">
      {allUsers?.data?.map((user) => (
        <AddFriendCart user={user} />
      ))}
    </div>
  );
};

export default AddFriendSection;
