import { useDispatch } from "react-redux";
import { createBook } from "../../features/books/BookService";
import BookForm from "../../components/BookForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAdd = async (formData) => {
    try {
      await dispatch(createBook(formData)).unwrap();
      toast.success("Book added!");
      navigate("/admin/books");
    } catch (err) {
     toast.error("Failed to add book");
      console.log(err);
    }
  };

  return <BookForm onSubmit={handleAdd} />;
}
