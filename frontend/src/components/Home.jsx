import React, { useEffect, useState } from "react";
import CreatePost from "./CreatePost";
import { ServerApi } from "../constants.js";
import PostContainer from "./PostContainer";
import axios from "axios";

const Home = () => {
  const [postsData, setPostData] = useState({});
  const limit = 3;
  const page = 1;
  useEffect(() => {
    const postFetch = async () => {
      try {
        const res = await axios.get(
          `${ServerApi}/post/getPostPagenation?limit=${limit}&page=${page}`,
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          setPostData(res.data);
          // console.log(res.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    postFetch();
  }, []);

  return (
    <div className="flex flex-col items-center bg-black">
      <div className="w-full">
        <CreatePost setPostData={setPostData} />
      </div>
      <div>
        <PostContainer serverRecived={postsData} setPostData={setPostData} />
      </div>
    </div>
  );
};

export default Home;
