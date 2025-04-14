import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../config";

const BookDetails = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book:", error);
        setError("Failed to fetch book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

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

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-500 text-xl">Book not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-900"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Books
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src={
                  book.coverImage ||
                  "https://via.placeholder.com/400x600?text=No+Image"
                }
                alt={book.title}
              />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                {book.genre}
              </div>
              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                {book.title}
              </h1>
              <p className="mt-2 text-2xl text-gray-600">by {book.author}</p>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Book Details
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div>
                    <span className="text-gray-600 font-medium">Status: </span>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                        book.status === "available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {book.status.charAt(0).toUpperCase() +
                        book.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">
                      Location:{" "}
                    </span>
                    <span className="text-gray-900">{book.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">
                      Condition:{" "}
                    </span>
                    <span className="text-gray-900">{book.condition}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">
                      Published:{" "}
                    </span>
                    <span className="text-gray-900">{book.publishedYear}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Description
                </h2>
                <p className="mt-2 text-gray-600 leading-relaxed">
                  {book.description}
                </p>
              </div>

              {user?.role === "owner" && user?.id === book.ownerId && (
                <div className="mt-8 flex space-x-4">
                  <button
                    onClick={async () => {
                      try {
                        await axios.delete(`${BASE_URL}/api/books/${book.id}`);
                        navigate("/");
                      } catch (error) {
                        console.error("Failed to delete book:", error);
                      }
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Delete Book
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await axios.put(
                          `${BASE_URL}/api/books/${book.id}/status`,
                          {
                            status:
                              book.status === "available"
                                ? "unavailable"
                                : "available",
                          }
                        );
                        setBook((prev) => ({
                          ...prev,
                          status:
                            prev.status === "available"
                              ? "unavailable"
                              : "available",
                        }));
                      } catch (error) {
                        console.error("Failed to update status:", error);
                      }
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Toggle Availability
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
