import React, { useState } from "react";
import { toast } from "sonner";
import { updateProfile } from "../profile.service";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditProfile = ({ setCurrentUser, currentUser, isEdit, setIsEdit }) => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    image: null,
  });
  const handleProfileUpdate = async () => {
    try {
      const form = new FormData();
      if (formData.name) form.append("name", formData.name);
      if (formData.bio) form.append("bio", formData.bio);
      if (formData.image) form.append("profile", formData.image);

      const res = await updateProfile(form);

      if (res.status === 200) {
        setCurrentUser(res.data.user);
        // Update user in auth store
        setIsEdit((prev) => !prev);
        setFormData({ name: "", bio: "", image: null });
        toast.success("Profile Update Successfully");
      } else {
        console.error(res.data.message);
        toast.error("Something error happened while updating profile");
      }
    } catch (error) {
      console.error(
        error.message || "Something went wrong while updating profile",
      );
      toast.error(error.message);
    }
  };
  return (
    <>
      {isEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setIsEdit(false)}
            >
              <X />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                className="border rounded p-2"
                placeholder={currentUser.name}
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <label className="text-sm font-medium">Bio</label>
              <textarea
                className="border rounded p-2"
                rows="3"
                placeholder={currentUser.bio || "Write about yourself..."}
                value={formData.bio}
                onChange={(e) =>
                  setFormData({ ...formData, bio: e.target.value })
                }
              />

              <label className="text-sm font-medium">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
              />

              <Button
                onClick={handleProfileUpdate}
                className="mt-4 bg-blue-600 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
