import React, { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import Card from "../../components/Card";
import { getFavourite } from "../../features/favourite/FavouriteService";
const Favourites = () => {
  const { favouriteBooks } = useSelector((state) => state.favourite);
const dispatch = useDispatch();
useEffect(() => {
    dispatch(getFavourite());
},[dispatch])

  return (
    <div className="w-[80%]">
      <h2>Favourites</h2>
      <div>
        {favouriteBooks?.map((book) => (
            <Card book={book}/>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
