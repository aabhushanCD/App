import { useEffect, useState } from "react";
import DisplayPost from "./displayPost";
import Navbar from "../header/navBar";
function DisplayPostBox() {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);

  const getAllPost = async (page) => {
    const response = await fetch("http://localhost:8000/api/post/displayPost", {
      method: "GET",
      headers: {
        "content-Type": "application/json",
      },
      param: page,
    });
    if (!response.ok) {
      console.log("error in response");
    }
    const { details } = await response.json();
    setPostData((prevPost) => [...prevPost, ...details]);
  };
  useEffect(() => {
    getAllPost(page);
  }, [page]);
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <div>
        <DisplayPost postData={postData}></DisplayPost>
        <button onClick={loadMorePosts}>LoadMore</button>
      </div>
    </>
  );
}

export default DisplayPostBox;
