import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/AuthServices";
import * as Yup from "yup";
const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (formData.avatar) {
      const objectUrl = URL.createObjectURL(formData.avatar);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [formData.avatar]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData({
        ...formData,
        avatar: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      validationSchema.validateSync(formData, { abortEarly: false });
      const { name, email, password, avatar } = formData;
      const registerData = new FormData();
      registerData.append("name", name);
      registerData.append("email", email);
      registerData.append("password", password);
      if (avatar) registerData.append("avatar", avatar);
      dispatch(register(registerData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[100vh] flex flex-col items-center justify-center">
      <div className="shadow-md p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {preview && (
            <img
              src={preview}
              alt="Avatar Preview"
              className="w-32 h-32 object-cover rounded-full mb-2"
            />
          )}

          <label
            htmlFor="avatar"
            className="cursor-pointer mb-2 bg-gray-200 hover:bg-gray-300 py-1 px-3 rounded"
          >
            Choose Your Profile Picture
          </label>
          <input
            onChange={handleChange}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            className="hidden"
          />

          <input
            className="mb-2 border border-gray-300 rounded-md p-2 w-64"
            onChange={handleChange}
            value={formData.name}
            name="name"
            type="text"
            placeholder="Name"
          />
          <input
            className="mb-2 border border-gray-300 rounded-md p-2 w-64"
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="mb-4 border border-gray-300 rounded-md p-2 w-64"
            onChange={handleChange}
            value={formData.password}
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
          <button
            className="cursor-pointer block w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
