import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BookOpenIcon, UserIcon } from "@heroicons/react/24/outline";
import { BASE_URL } from "../config";

function Dashboard({ user }) {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    if (user?.role === "owner") {
      fetchUserBooks();
    }
  }, [user]);

  const fetchUserBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books`);
      const books = response.data.filter((book) => book.ownerId === user.id);
      setUserBooks(books);
    } catch (error) {
      console.error("Error fetching user books:", error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`${BASE_URL}/api/books/${bookId}`);
      fetchUserBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Welcome, {user.name}!</h1>
        <div className="flex items-center text-gray-600">
          <UserIcon className="h-5 w-5 mr-2" />
          <span>
            Role: {user.role === "owner" ? "Book Owner" : "Book Seeker"}
          </span>
        </div>
      </div>

      {user.role === "owner" && (
        <div className="mb-8">
          <Link
            to="/add-book"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Add New Book
          </Link>
        </div>
      )}

      {user.role === "owner" && userBooks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
                <p className="text-gray-600 mb-2">by {book.author}</p>
                {book.genre && (
                  <p className="text-gray-500 mb-2">Genre: {book.genre}</p>
                )}
                <p className="text-gray-600 mb-2">Location: {book.location}</p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      book.status === "available"
                        ? "bg-green-100 text-green-800"
                        : book.status === "rented"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {book.status}
                  </span>
                  <button
                    onClick={() => handleDeleteBook(book.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {user.role === "owner" && userBooks.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">You haven't added any books yet.</p>
          <Link
            to="/add-book"
            className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Add Your First Book
          </Link>
        </div>
      )}

      {user.role === "seeker" && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Browse available books to find your next read!
          </p>
          <Link
            to="/books"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Browse Books
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
