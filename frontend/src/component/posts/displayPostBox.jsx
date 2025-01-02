import { useEffect, useState } from "react";
// import { AiOutlineFontSize, AiOutlineLoading3Quarters } from "react-icons/ai";
import DisplayPost from "./displayPost";
import Navbar from "../header/navBar";
import { Alert } from "@mui/material";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { Height } from "@mui/icons-material";
function DisplayPostBox() {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAllPost = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/post/displayPost",
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
          param: page,
        }
      );
      if (!response.ok) {
        const responseData = await response.json();
        const errorMessage = responseData?.message || "Cannot get posts";
        throw new Error(errorMessage);
      }
      const { details } = await response.json();
      console.log(details);
      setPostData((prevPost) => [...prevPost, ...details]);
    } catch (error) {
      setError(error.message || "something went wrong!!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPost(page);
  }, [page]);
  const loadMorePosts = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <Navbar></Navbar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {error && (
          <Alert severity="error">No post's are available {error}</Alert>
        )}
        {loading ? (
          <AiOutlineLoading3Quarters
            style={{ fontSize: "24px", animation: "spin 1s linear infinite" }}
          />
        ) : (
          <>
            <DisplayPost postData={postData}></DisplayPost>
            <button
              onClick={loadMorePosts}
              style={{ marginBottom: "50px", borderRadius: "5px" }}
            >
              LoadMore
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default DisplayPostBox;
