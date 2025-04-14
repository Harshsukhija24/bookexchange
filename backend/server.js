const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage
let users = [];
let books = [];

// Helper functions
const generateId = () => Math.random().toString(36).substr(2, 9);

// User routes
app.post("/api/register", (req, res) => {
  const { name, email, password, mobileNumber, role } = req.body;

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const newUser = {
    id: generateId(),
    name,
    email,
    password,
    mobileNumber,
    role,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json(user);
});

// Book routes
app.post("/api/books", (req, res) => {
  const { title, author, genre, location, contactInfo, ownerId } = req.body;

  const newBook = {
    id: generateId(),
    title,
    author,
    genre,
    location,
    contactInfo,
    ownerId,
    status: "available",
    createdAt: new Date(),
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.get("/api/books", (req, res) => {
  const { search, location, genre } = req.query;

  let filteredBooks = [...books];

  if (search) {
    filteredBooks = filteredBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (location) {
    filteredBooks = filteredBooks.filter((book) =>
      book.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  if (genre) {
    filteredBooks = filteredBooks.filter((book) =>
      book.genre?.toLowerCase().includes(genre.toLowerCase())
    );
  }

  // Add owner info to each book
  const booksWithOwner = filteredBooks.map((book) => {
    const owner = users.find((user) => user.id === book.ownerId);
    return {
      ...book,
      ownerName: owner?.name || "Unknown",
    };
  });

  res.json(booksWithOwner);
});

app.put("/api/books/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const book = books.find((b) => b.id === id);
  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  book.status = status;
  res.json(book);
});

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const bookIndex = books.findIndex((b) => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ error: "Book not found" });
  }

  books.splice(bookIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
