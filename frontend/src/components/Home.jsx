import React, { useState } from "react";
import CreatePost from "./CreatePost";

import PostContainer from "./PostContainer";
var serverRecived = [
  {
    content: "This is new post ",
    files: [
      {
        imageUrl:
          "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg",
        videoUrl:
          "https://www.pexels.com/video/vibration-on-a-flat-surface-7859858/",
      },
    ],
  },
];

const Home = () => {
  const [postsData, setPostData] = useState({});
  return (
    <div className="flex flex-col justify-center items-center bg-amber-300">
      <div className="w-full">
        <CreatePost setPostData={setPostData} />
      </div>
      <PostContainer serverRecived={serverRecived} />

      <PostContainer serverRecived={serverRecived} />
    </div>
  );
};

export default Home;
