import { useState, useEffect } from "react";

export default function BookForm({ initialData = {}, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    price: "",
    description: "",
    image: "",
    ...initialData,
  });

  const [previewImage, setPreviewImage] = useState(initialData.image || "");

  useEffect(() => {
    if (initialData.image) {
      setPreviewImage(initialData.image);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files[0]) {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("author", formData.author);
      formPayload.append("price", formData.price);
      formPayload.append("description", formData.description);
      formPayload.append("image", formData.image);
      formPayload.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });
      onSubmit(formPayload);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="scrollbar-hide overflow-auto flex-1 max-w-3xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-10 border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        {initialData._id ? "Edit Book" : "Add New Book"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Preview */}
        <div className="text-center">
          <div className="relative w-52 h-72 mx-auto rounded-md overflow-hidden border border-gray-300 bg-gray-50 shadow-sm">
            {previewImage ? (
              <img
                src={previewImage}
                alt="Preview"
                className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                No image selected
              </div>
            )}
          </div>
          <div className="mt-4">
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-medium
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter book name"
          />
        </div>

        {/* Author */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter author name"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter price"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter book description"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            {initialData._id ? "Update Book" : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}
