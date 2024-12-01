"use client";
import Axios from "@/app/utils/axiosInstance";
import { useEffect, useState } from "react";

interface UserUpdateModalProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    hasPassword: boolean;
  };
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const UserUpdateModal = ({ user, onClose, onSubmit }: UserUpdateModalProps) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    image: user.image || "",
    // password: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [activeTab, setActiveTab] = useState("profile");
  const [hasPassword, setHasPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    console.log(user, "dfifi");
    setHasPassword(user.hasPassword);
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result as string;
        console.log(imageData, "399");
        try {
          const response = await Axios.put("/api/auth/user", {
            id: user.id, // Send the user ID along with other data if needed
            image: imageData, // Send the base64 image data
          });

          if (response.status === 200) {
            console.log("Image updated successfully:", response.data);
            // Update form data if needed after the successful API call
            setFormData((prevData) => ({
              ...prevData,
              image: imageData,
            }));
          } else {
            console.error("Error uploading image:", response.data.message);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }

        // setFormData((prevData) => ({
        //   ...prevData,
        //   image: reader.result as string,
        // }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      if (activeTab === "profile") {
        const response = await Axios.put("/api/auth/user", {
          id: user.id,
          name: formData.name,
        });
        if (response.status === 200) {
          alert("Password updated successfully!");
          onClose();
        }
      } else {
        if (formData.newPassword !== formData.confirmPassword) {
          setErrorMessage("New password and confirm password do not match.");
          return;
        }

        if (hasPassword) {
          const response = await Axios.put("/api/auth/user", {
            id: user.id,
            oldPassword: formData.oldPassword,
            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          });

          if (response.status === 200) {
            alert("Password updated successfully!");
            onClose();
          }
        } else {
          const response = await Axios.put("/api/auth/user", {
            id: user.id,

            newPassword: formData.newPassword,
            confirmPassword: formData.confirmPassword,
          });

          if (response.status === 200) {
            alert("Password updated successfully!");
            onClose();
          }
        }
      }
    } catch (error: any) {
      console.error("Error updating password:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update password."
      );
    }
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center z-50"
    >
      <div className="bg-white w-full  sm:h-auto mx-4 sm:mx-auto sm:w-3/6 p-8 rounded-3xl shadow-xl transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-semibold text-gray-800 tracking-tight">
            Update Profile
          </h3>
          <button
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row">
          {/* Vertical Tabs Section */}
          <div className="w-1/4 flex flex-row sm:!flex-col mb-4 items-center sm:items-stretch  sm:mb-auto sm:border-r-2 pr-3 border-gray-300 sm:space-y-2">
            <div
              className={`p-2 text-center cursor-pointer transition-all duration-300 ${
                activeTab === "profile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("profile")}
            >
              Profile
            </div>
            <div
              className={`p-2 text-center  cursor-pointer transition-all duration-300 ${
                activeTab === "password"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-blue-600 hover:text-white"
              }`}
              onClick={() => setActiveTab("password")}
            >
              Password
            </div>
          </div>

          {/* Tab Content Section */}
          <div className="w-full sm:w-3/4 sm:pl-8 space-y-8">
            {/* Profile Tab Content */}
            {activeTab === "profile" && (
              <div>
                {/* Image Upload */}
                <div className="flex justify-center items-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={formData.image || "/img/avatar-user.svg"}
                      alt="User Avatar"
                      className="w-full h-full object-cover"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    id="name"
                    className="mt-2 w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email Input */}
                <div className="mt-4">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    id="email"
                    className="mt-2 w-full px-3 py-2 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-600 transition-all duration-300"
                    placeholder="Your email"
                    disabled
                  />
                </div>
              </div>
            )}

            {/* Password Tab Content */}
            {activeTab === "password" && (
              <div>
                {hasPassword && (
                  <>
                    <div>
                      <label className="block mb-2 font-medium">
                        Old Password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={formData.oldPassword}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        placeholder="Enter your old password"
                      />
                    </div>
                  </>
                )}
                <div className="mt-4">
                  <label className="block mb-2 font-medium">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter your new password"
                  />
                </div>
                <div className="mt-4">
                  <label className="block mb-2 font-medium">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Repeat your new password"
                  />
                </div>

                {/* Error Message */}
                {errorMessage && (
                  <p className="text-red-600 mt-4">{errorMessage}</p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            className="w-1/2 py-2 sm:py-3 text-gray-600 bg-gray-200 rounded-xl font-medium hover:bg-gray-300 transition-all duration-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="w-1/2 py-2 sm:py-3  text-white bg-blue-600 rounded-xl font-medium hover:bg-blue-700 transition-all duration-300"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateModal;
