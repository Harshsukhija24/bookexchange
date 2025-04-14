// In-memory database
const db = {
  users: [],
  books: [],
};

// Demo data
const demoBooks = [
  {
    id: "1",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    genre: "Business",
    coverImage:
      "https://m.media-amazon.com/images/I/71TRUbzcvaL._AC_UF1000,1000_QL80_.jpg",
    status: "available",
    location: "New York",
    contactInfo: "morgan@example.com",
    ownerId: "1",
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "How Innovation Works",
    author: "Matt Ridley",
    genre: "Business",
    coverImage:
      "https://i.pinimg.com/236x/52/23/d8/5223d8245a972b2aa3f6319d019b8695.jpg",
    status: "available",
    location: "San Francisco",
    contactInfo: "matt@example.com",
    ownerId: "1",
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "The Bees",
    author: "Laline Paull",
    genre: "Sci-Fi",
    coverImage:
      "https://i.pinimg.com/236x/b2/c1/5f/b2c15f734ce589e740ba9390ee2397f8.jpg",
    status: "available",
    location: "London",
    contactInfo: "laline@example.com",
    ownerId: "2",
    createdAt: new Date(),
  },
  {
    id: "4",
    title: "Real Help",
    author: "Ayodeji Awosika",
    genre: "Self-Help",
    coverImage:
      "https://i.pinimg.com/236x/b3/c7/a6/b3c7a60e11b25e3d908924832ff23509.jpg",
    status: "available",
    location: "Chicago",
    contactInfo: "ayodeji@example.com",
    ownerId: "2",
    createdAt: new Date(),
  },
  {
    id: "5",
    title: "The Fact of a Body",
    author: "Alexandria Marzano-Lesnevich",
    genre: "True Crime",
    coverImage:
      "https://i.pinimg.com/236x/ff/c9/e6/ffc9e6ccbf155330c7e43020cf4e52a9.jpg",
    status: "available",
    location: "Boston",
    contactInfo: "alexandria@example.com",
    ownerId: "3",
    createdAt: new Date(),
  },
];

// Demo users
const demoUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    mobileNumber: "1234567890",
    role: "owner",
  },

  {
    id: "2",
    name: "Bob Wilson",
    email: "bob@example.com",
    password: "password123",
    mobileNumber: "5555555555",
    role: "seeker",
  },
];

// Initialize demo data
db.books = [...demoBooks];
db.users = [...demoUsers];

module.exports = db;
