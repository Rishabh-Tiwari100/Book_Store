import "./App.css";

import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshSession } from "./features/auth/AuthServices";

// Route guards
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import PublicRoute from "./routes/PublicRoute";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/private/Cart";
import Profile from "./pages/private/Profile";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Loading from "./components/Loading";
import EditBook from "./pages/admin/EditBook";
import AddBook from "./pages/admin/AddBook";
import Favourites from "./pages/private/Favourites";
import OrderHistory from "./pages/private/OrderHistory";
import ManageProfile from "./pages/private/ManageProfile";
// Layout for routes with Navbar

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshSession());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Public routes without Navbar */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book/:id" element={<BookDetails />} />

        {/* Public routes with Navbar */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />}>
            <Route index element={<ManageProfile />} />
            <Route path="favourites" element={<Favourites />} />
            <Route path="my-orders" element={<OrderHistory />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="profile" element={<ManageProfile />} />
          <Route path="orders" element={<Orders />} />
          {/* <Route path="users" element={<Users />} /> */}
          <Route path="books/add" element={<AddBook />} />
          <Route path="books/edit/:id" element={<EditBook />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
