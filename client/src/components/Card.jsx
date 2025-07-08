import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({book}) => {
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/book/${book._id}`)}  className="m-2 shadow-lg p-4" key={book._id}>
      <h3 className="font-bold text-center truncate overflow-hidden whitespace-nowrap">
        {book.name}
      </h3>
      <img className="m-auto w-40 h-60" src={book.image} alt={book.name} />
      <div className="flex justify-between">
        <p className="text-sm">by {book.author}</p>
        <p className="font-bold">${book.price}</p>
      </div>
    </div>
  );
};

export default Card;
