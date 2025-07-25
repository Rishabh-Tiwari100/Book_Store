import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookById, updateBook } from "../../features/books/BookService";
import BookForm from "../../components/BookForm";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { book } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBookById(id));
  }, [dispatch, id]);

  const handleEdit = async (formData) => {
    try {
      await dispatch(updateBook({ id, data: formData })).unwrap();
      toast.success("Book updated!");
      navigate("/home");
    } catch (err) {
      toast.error("Failed to update book");
      console.log(err);
    }
  };

  return book ? (
    <BookForm initialData={book} onSubmit={handleEdit} />
  ) : (
    <p className="text-center mt-6">Loading...</p>
  );
}
