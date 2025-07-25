import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../../components/Card";
import { getFavourite } from "../../features/favourite/FavouriteService";

const Favourites = () => {
  const { favouriteBooks } = useSelector((state) => state.favourite);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavourite());
  }, [dispatch]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Favourite Books</h2>

      {favouriteBooks && favouriteBooks.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favouriteBooks.map((book) => (
            <Card key={book.id || book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-gray-500 text-lg mt-4">
          You have no favourite books yet.
        </div>
      )}
    </div>
  );
};

export default Favourites;
