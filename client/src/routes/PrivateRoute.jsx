import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import Loading from "../components/Loading";
const PrivateRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoading == false && user == null) {
      navigate("/login");
    }
  }, [isLoading, navigate, user]);

  if (isLoading) return <Loading />;

  return (
       <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="h-full flex">
            <Outlet />
          </div>
        </div>
      </div>
  );
};

export default PrivateRoute;
