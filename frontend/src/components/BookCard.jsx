import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/books/${book.id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <img
        className="w-full h-48 object-cover"
        src={
          book.coverImage ||
          "https://i.pinimg.com/736x/a0/6d/9d/a06d9d4cbfffb3c94dd1afb749347fc8.jpg"
        }
        alt={book.title}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {book.title}
        </h3>
        <p className="text-gray-600 mb-2">by {book.author}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{book.genre}</span>
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              book.status === "available"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {book.status.charAt(0).toUpperCase() + book.status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
