import React, { useState, useRef } from "react";
import { useAuth } from "@/store/AuthStore";
import axios from "axios";
import { ServerApi } from "@/constants";
import { toast } from "sonner";
import { Camera } from "lucide-react";

const Profile = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  
  const [profileImage, setProfileImage] = useState(currentUser?.imageUrl || "");
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  if (!currentUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setProfileImage(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();

      if (file) formData.append("profile", file);

      const res = await axios.put(`${ServerApi}/auth/updateProfile`, formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        toast.success("Profile updated successfully!");
        setCurrentUser(res.data.updatedUser);
        setEditMode(false);
        setFile(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl p-6 flex flex-col sm:flex-row gap-8">
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40">
            <img
              src={profileImage}
              alt={`${currentUser.name}'s profile`}
              className="w-40 h-40 rounded-full object-cover border-2 border-gray-200"
            />
            {editMode && (
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-2 right-2 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
              >
                <Camera size={18} />
              </button>
            )}
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
          {!editMode && (
            <p className="mt-4 text-lg font-semibold">{currentUser.name}</p>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Profile Information</h2>
            <button
              onClick={() => setEditMode((prev) => !prev)}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              {editMode ? "Cancel" : "Edit"}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-medium">Name</label>
            {<p className="text-gray-800">{currentUser.name}</p>}
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-gray-600 font-medium">Email</label>

            <p className="text-gray-800">{currentUser.email}</p>
          </div>

          {editMode && (
            <button
              onClick={handleUpdateProfile}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 mt-4 self-start"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
