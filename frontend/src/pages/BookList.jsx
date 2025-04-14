import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";

function BookList({ user }) {
  const [allBooks, setAllBooks] = useState([]); // Store all books
  const [books, setBooks] = useState([]); // Filtered books for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ searchTerm: "" });

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/books");
        setAllBooks(response.data); // Save all books
        setBooks(response.data); // Initially display all books
      } catch (error) {
        setError("Failed to fetch books");
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    // Filter books based on search terms
    const filteredBooks = allBooks.filter((book) => {
      const term = filters.searchTerm.toLowerCase();
      return (
        term === "" ||
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term) ||
        book.genre.toLowerCase().includes(term)
      );
    });

    setBooks(filteredBooks);
  }, [filters, allBooks]); // Apply filters when they change

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters); // Update search term
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Available Books</h1>
          {user?.role === "owner" && (
            <Link
              to="/add-book"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <PlusCircleIcon className="h-5 w-5" />
              <span>Add New Book</span>
            </Link>
          )}
        </div>
        <SearchBar onSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <div className="text-center text-gray-500 text-xl mt-8">
              No books found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookList;
