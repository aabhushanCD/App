
import FriendRequestCart from "./components/FriendRequestCart";

const FriendRequestSection = ({ allUsers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {allUsers?.data?.map((user) => (
        <FriendRequestCart user={user} />
      ))}
    </div>
  );
};

export default FriendRequestSection;
