import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, getBookById } from "../features/books/BookService";
import { addToCart } from "../features/cart/cartService";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Confirmation from "../components/Confirmation";
import { addToFavourite } from "../features/favourite/FavouriteService";
import { toast } from "react-toastify";
const BookDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const { book } = useSelector((state) => state.books);
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getBookById(id));
  }, [id, dispatch]);

  const handleAddToCart = () => {
    dispatch(addToCart({ book, quantity: 1 }));
    toast.success("Added to cart!");
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteBook(id)).unwrap();
      setOpenModal(false);
      navigate("/home");
      toast.success("Book deleted!");
    } catch (error) {
      setOpenModal(false);
      console.log(error);
      toast.error("Failed to delete book!");
    }
  };

  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto">
      {book && (
        <div className="space-y-10">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              {book.name}
            </h1>

            {/* Language & Price */}
            <div className="flex justify-center gap-4 flex-wrap">
              {book.language && (
                <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-4 py-1 rounded-full shadow">
                  Language: {book.language}
                </span>
              )}
              {book.price && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full shadow">
                  Price: ₹{Number(book.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Image */}
            <img
              src={book.image}
              alt={book.name}
              className="w-full max-w-md mx-auto rounded-xl shadow-lg"
            />

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              {book.description}
            </p>
          </div>

          {/* User Actions */}
          {user?.role === "user" && (
            <div className="flex flex-col md:flex-row justify-center gap-6 items-center">
              <button
                onClick={() => dispatch(addToFavourite(book))}
                className="cursor-pointer bg-pink-500 text-white px-6 py-2 rounded-lg shadow transition-transform hover:scale-105 active:scale-95"
              >
                Add to Favourite
              </button>
              <button
                onClick={handleAddToCart}
                className="cursor-pointer bg-gradient-to-r from-violet-500 via-sky-500 to-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow transition-transform hover:scale-105 active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          )}

          {/* Admin Actions */}
          {user?.role === "admin" && (
            <div className="flex justify-center gap-6">
              <button
                onClick={() => navigate(`/admin/books/edit/${id}`)}
                className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-xl shadow hover:bg-blue-600"
              >
                <FaEdit /> Edit Book
              </button>
              <button
                onClick={() => setOpenModal(true)}
                className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl shadow hover:bg-red-600"
              >
                <MdDelete /> Delete Book
              </button>
            </div>
          )}

          {/* Confirmation Modal */}
          {openModal && (
            <dialog
              open
              className="fixed m-auto inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
            >
              <div className="bg-white rounded-lg p-6 shadow-xl relative w-full max-w-md">
                <button
                  onClick={() => setOpenModal(false)}
                  className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
                <Confirmation
                  handleCancel={() => setOpenModal(false)}
                  handleConfirm={handleDelete}
                  bookId={id}
                />
              </div>
            </dialog>
          )}
        </div>
      )}
    </div>
  );
};

export default BookDetails;
