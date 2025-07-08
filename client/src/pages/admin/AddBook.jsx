import { useDispatch } from "react-redux";
import { createBook } from "../../features/books/BookService";
import BookForm from "../../components/BookForm";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await dispatch(createBook(formData)).unwrap();
      alert("Book added!");
      navigate("/admin/books");
    } catch (err) {
      alert("Failed to add book");
      console.log(err);
    }
  };

  return <BookForm onSubmit={handleAdd} />;
}
