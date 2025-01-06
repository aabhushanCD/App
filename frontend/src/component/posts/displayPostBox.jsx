import { useEffect, useState } from "react";
import { AiOutlineFontSize, AiOutlineLoading3Quarters } from "react-icons/ai";
import DisplayPost from "./displayPost";
import Navbar from "../header/navBar";
import { Alert } from "@mui/material";
import SideBar from "../sideBar/SideBar";
import "./style.css";
function DisplayPostBox() {
  const [postData, setPostData] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAllPost = async () => {
    setLoading(true);
    const limit = 10;
    try {
      const response = await fetch(
        `http://localhost:8000/api/post/displayPost/${page}/${limit}`,
        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
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
    const infiniteScroll = () => {
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      if (scrollTop + innerHeight + 10 >= scrollHeight && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };
    window.addEventListener("scroll", infiniteScroll);
    return () => {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [loading]);
  useEffect(() => {
    getAllPost();
  }, [page]);

  return (
    <>
      <Navbar></Navbar>
      <SideBar></SideBar>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",

          margin: "auto",
        }}
      >
        {error && <Alert severity="info">No posts are available {error}</Alert>}
        <DisplayPost postData={postData} />
        {loading && <AiOutlineLoading3Quarters className="spinner" />}
      </div>
    </>
  );
}

export default DisplayPostBox;
