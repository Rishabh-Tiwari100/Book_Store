import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks } from "../features/books/BookService";
import Card from "../components/Card";
const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold">All Books</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 m-2">
        {books && books.map((book) => <Card key={book._id} book={book} />)}
      </div>
    </div>
  );
};

export default Books;
