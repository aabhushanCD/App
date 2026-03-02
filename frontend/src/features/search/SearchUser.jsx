import { useNavigate } from "react-router-dom";

const SearchUser = ({ data, setOpen }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer transition"
      onClick={() => {
        setOpen(false);
        navigate(`/user/profile/${data._id}`);
      }}
    >
      <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
        {data.imageUrl ? (
          <img src={data.imageUrl} className="w-full h-full object-cover" />
        ) : (
          <span className="font-semibold text-gray-700">{data.name[0]}</span>
        )}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-800">{data.name}</span>
      </div>
    </div>
  );
};

export default SearchUser;
