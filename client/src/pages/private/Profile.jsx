import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
const Profile = () => {
  const [navLinks, _] = useState([
    {
      id: 1,
      name: "Profile",
      path: "/profile",
    },
    {
      id: 2,
      name: "Favourites",
      path: "favourites",
    },
    {
      id: 3,
      name: "Order History",
      path: "my-orders",
    },
  ]);

  return (
    <div className="flex flex-1">
      <Sidebar navLinks={navLinks} />
      <Outlet />
    </div>
  );
};

export default Profile;
