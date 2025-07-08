// 



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { HiMenu, HiX } from "react-icons/hi";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="bg-[#0800ffbf] text-white p-4">
      <div className="flex items-center justify-between">
        <Link className="text-2xl font-bold" to="/">
          BookVerse
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <Link className="hover:underline" to="/books">All Books</Link>
          <Link className="hover:underline" to="/about">About Us</Link>
          {user?.role === "user" && (
            <Link className="hover:underline" to="/profile">Profile</Link>
          )}
          {user?.role === "admin" && (
            <Link className="hover:underline" to="/admin/profile">Dashboard</Link>
          )}
          {!user && (
            <>
              <Link className="hover:underline" to="/login">Login</Link>
              <Link className="hover:underline" to="/register">Sign Up</Link>
            </>
          )}
          {user?.role === "user" && (
            <Link to="/cart">
              <IoCartOutline size={25} />
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu Content */}
      {menuOpen && (
        <div className="flex flex-col gap-3 mt-4 md:hidden">
          <Link className="hover:underline" to="/books" onClick={toggleMenu}>All Books</Link>
          <Link className="hover:underline" to="/about" onClick={toggleMenu}>About Us</Link>
          {user?.role === "user" && (
            <Link className="hover:underline" to="/profile" onClick={toggleMenu}>Profile</Link>
          )}
          {user?.role === "admin" && (
            <Link className="hover:underline" to="/admin/profile" onClick={toggleMenu}>Dashboard</Link>
          )}
          {!user && (
            <>
              <Link className="hover:underline" to="/login" onClick={toggleMenu}>Login</Link>
              <Link className="hover:underline" to="/register" onClick={toggleMenu}>Sign Up</Link>
            </>
          )}
          {user?.role === "user" && (
            <Link className="flex items-center gap-1" to="/cart" onClick={toggleMenu}>
              <IoCartOutline size={22} />
              <span>Cart</span>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
