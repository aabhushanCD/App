import React from 'react'
import AllFriendCart from './components/AllFriendCart';

const AllFriendSection = ({allUsers}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
      {allUsers?.data?.map((user) => (
        <AllFriendCart user={user} />
      ))}
    </div>
  );
}

export default AllFriendSection