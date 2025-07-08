import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect } from "react";
const ProtectedRoutes = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoading == false && user == null) {
      navigate("/login");
    }
  }, [isLoading]);

  if (isLoading)
    return (
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28"
        />
      </div>
    );

  return user === null ? (
    <Navigate to="/login" />
  ) : (
    <>
      {user.role !== "admin" && <Navbar />}
      <Outlet />
    </>
  );
};

export default ProtectedRoutes;
