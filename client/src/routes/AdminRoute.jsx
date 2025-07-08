import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AdminRoute = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [navLinks, _] = useState([
    { id: 1, name: "Orders", path: "/admin/orders" },
    { id: 2, name: "Profile", path: "/admin/profile" },
    { id: 3, name: "Add Book", path: "/admin/books/add" },
  ]);
  useEffect(() => {
    if (isLoading == false && user == null) {
      <Navigate to="/login" />;
    }
  }, [isLoading, user]);

  if (isLoading) return <Loading />;

  return user?.role === "admin" ? (
    <>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <div className="h-full flex">
            <Sidebar navLinks={navLinks} />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  ) : (
    <Navigate to="/home" />
  );
};

export default AdminRoute;
