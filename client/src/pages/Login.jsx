import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/AuthServices";
import { toast } from "react-toastify";
import * as Yup from "yup";
const Login = () => {
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const data = { ...formData, [name]: value };
    setFormData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await dispatch(login(formData)).unwrap();
      navigate("/home");
      toast.success("Login successful!");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.errors[0]);
        return;
      }
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm bg-gray-800 p-12 text-white flex flex-col gap-4 rounded-xl"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>
        <Input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />
        <Input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          autoComplete="current-password"
        />

        <Button
          type="submit"
          className="w-full text-xl bg-blue-600"
          disabled={isLoading} // Disable button when loading
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="underline text-blue-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
