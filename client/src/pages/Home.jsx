import { useEffect } from "react";
import { config } from "../config";
import { getAllBooks } from "../features/books/BookService";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
const Home = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const recentBooks = books.slice(-4);
  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);
  return (
    <div>
      {books && (
        <>
          <div
            className="min-h-[80vh] flex justify-center items-center"
            style={{
              backgroundImage: `url(${config.bgHome})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-4xl text-center font-bold max-w-[40%] text-white">
              Welcome to BookVerse, this is the place where you can buy books
              online and get them delivered to your doorstep
            </p>
          </div>
          <div className="mt-10 p-2">
            <h4 className="text-2xl font-bold">Recently Added</h4>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 m-2">
              {books &&
                recentBooks.map((book) => <Card key={book._id} book={book} />)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
