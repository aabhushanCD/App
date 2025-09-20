import React, { useState } from "react";
import CreatePost from "./CreatePost";

const Home = () => {
  const [postsData, setPostData] = useState({});
  return (
    <div className="">
      <CreatePost setPostData={setPostData} postsData={postsData} />
    </div>
  );
};

export default Home;
