import React from "react";
import { useNavigate } from "react-router-dom";

const SearchUser = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-2  items-center border p-2 rounded-2xl bg-gray-100 "
      onClick={() => {
        navigate(`/user/profile/${data._id}`);
      }}
    >
      <div className="border rounded-full w-10 h-10">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt=""
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
      </div>
      <h1 className="font-semibold text-[17px]">{data.name}</h1>
    </div>
  );
};

export default SearchUser;
