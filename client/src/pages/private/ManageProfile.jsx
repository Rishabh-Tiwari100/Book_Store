import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/auth/AuthServices";

function ManageProfile() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setAddress(user.address || "");
      setPhone(user.phone || "");
      setPreview(user.avatar || "");
      setPhoto(null);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("phone", phone);
    if (photo) {
      formData.append("avatar", photo);
    }
    dispatch(updateUser(formData));
  };

  return (
    <div className="overflow-y-scroll grow p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
        Manage Profile
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Photo Field */}
        <div className="space-y-2">
          {preview && (
            <img
              src={preview}
              alt="Profile Preview"
              className="mt-4 w-24 h-24 rounded-full object-cover border border-gray-300"
            />
          )}
          <label
            htmlFor="photo"
            className="block text-lg font-medium text-gray-700"
          >
            Profile Photo
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setPhoto(file);
                setPreview(URL.createObjectURL(file));
              }
            }}
            className="w-full text-sm text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Name Field */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-lg font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <label htmlFor="address" className="block text-lg font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-lg font-medium text-gray-700">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default ManageProfile;
