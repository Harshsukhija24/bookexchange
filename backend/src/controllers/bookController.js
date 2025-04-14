const db = require("../config/db");
const Book = require("../models/Book");

const generateId = () => Math.random().toString(36).substr(2, 9);

const bookController = {
  getAllBooks: (req, res) => {
    try {
      const { search, category } = req.query;
      let filteredBooks = [...db.books];

      if (search) {
        const searchLower = search.toLowerCase();
        filteredBooks = filteredBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(searchLower) ||
            book.author.toLowerCase().includes(searchLower)
        );
      }

      if (category) {
        filteredBooks = filteredBooks.filter(
          (book) => book.genre.toLowerCase() === category.toLowerCase()
        );
      }

      const booksWithOwner = filteredBooks.map((book) => {
        const owner = db.users.find((user) => user.id === book.ownerId);
        return {
          ...book,
          ownerName: owner?.name || "Unknown",
        };
      });

      res.json(booksWithOwner);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  addBook: (req, res) => {
    try {
      const {
        title,
        author,
        genre,
        location,
        contactInfo,
        ownerId,
        coverImage,
      } = req.body;

      const newBook = new Book({
        id: generateId(),
        title,
        author,
        genre,
        location,
        contactInfo,
        ownerId,
        coverImage,
        status: "available",
        createdAt: new Date(),
      });

      db.books.push(newBook);
      res.status(201).json(newBook);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  updateBookStatus: (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const book = db.books.find((b) => b.id === id);
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      book.status = status;
      res.json(book);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  deleteBook: (req, res) => {
    try {
      const { id } = req.params;
      const bookIndex = db.books.findIndex((b) => b.id === id);

      if (bookIndex === -1) {
        return res.status(404).json({ error: "Book not found" });
      }

      db.books.splice(bookIndex, 1);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  getBooksByOwner: (req, res) => {
    try {
      const { ownerId } = req.params;
      const ownerBooks = db.books.filter((book) => book.ownerId === ownerId);
      res.json(ownerBooks);
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  },

  // getBookById: (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const book = db.books.find((b) => b.id === id);

  //     if (!book) {
  //       return res.status(404).json({ error: "Book not found" });
  //     }

  //     const owner = db.users.find((user) => user.id === book.ownerId);
  //     const bookWithOwner = {
  //       ...book,
  //       ownerName: owner?.name || "Unknown",
  //       ownerEmail: owner?.email,
  //       ownerMobile: owner?.mobileNumber,
  //     };

  //     res.json(bookWithOwner);
  //   } catch (error) {
  //     res.status(500).json({ error: "Server error" });
  //   }
  // },
  // getBookById: (req, res) => {
  //   try {
  //     const { id } = req.params; // Get the ID from the request parameters
  //     console.log("Received ID:", id); // Log the received ID for debugging

  //     // Find the book by ID
  //     const book = db.books.find((b) => b.id === id);
  //     if (!book) {
  //       return res.status(404).json({ error: "Book not found" });
  //     }

  //     // Find the owner of the book
  //     const owner = db.users.find((user) => user.id === book.ownerId);
  //     const bookWithOwner = {
  //       ...book,
  //       ownerName: owner?.name || "Unknown",
  //       ownerEmail: owner?.email,
  //       ownerMobile: owner?.mobileNumber,
  //     };

  //     console.log("Found book:", bookWithOwner); // Log the found book for debugging

  //     res.json(bookWithOwner);
  //   } catch (error) {
  //     console.error("Error fetching book by ID:", error); // Log the error
  //     res.status(500).json({ error: "Server error" });
  //   }
  // },
  getBookById: (req, res) => {
    try {
      const { id } = req.params; // Get the ID from the request parameters
      console.log("Received ID:", id); // Log the received ID for debugging

      // Log the contents of db.books to check the available books
      console.log("Books in database:", db.books);

      // Find the book by ID, ensuring consistent ID format (string comparison)
      const book = db.books.find((b) => b.id === id.toString()); // Assuming book ID is stored as a string
      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }

      // Find the owner of the book
      const owner = db.users.find((user) => user.id === book.ownerId);
      const bookWithOwner = {
        ...book,
        ownerName: owner?.name || "Unknown",
        ownerEmail: owner?.email,
        ownerMobile: owner?.mobileNumber,
      };

      console.log("Found book:", bookWithOwner); // Log the found book for debugging

      res.json(bookWithOwner);
    } catch (error) {
      console.error("Error fetching book by ID:", error); // Log the error
      res.status(500).json({ error: "Server error" });
    }
  },
};

module.exports = bookController;
