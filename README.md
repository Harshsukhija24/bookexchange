# Book Exchange Platform

A platform for book lovers to exchange books with each other.

## Features

- User authentication (login/register)
- Book listing and search
- Book details view
- Add new books
- User dashboard
- Book exchange requests

## Tech Stack

- Frontend: React, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```



4. Start the development servers:
   ```bash
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server
   cd ../frontend
   npm run dev
   ```

## Predefined Test Data

### Test Users

1. Book Owner Account:
   - Email: owner@example.com
   - Password: owner123
   - Role: owner

2. Book Seeker Account:
   - Email: seeker@example.com
   - Password: seeker123
   - Role: seeker

### Sample Books

1. The Great Gatsby
   - Author: F. Scott Fitzgerald
   - Genre: Classic
   - Condition: Good
   - Location: New York
   - Status: Available

2. To Kill a Mockingbird
   - Author: Harper Lee
   - Genre: Fiction
   - Condition: Like New
   - Location: California
   - Status: Available

3. 1984
   - Author: George Orwell
   - Genre: Dystopian
   - Condition: Fair
   - Location: Texas
   - Status: Available

4. Pride and Prejudice
   - Author: Jane Austen
   - Genre: Romance
   - Condition: Good
   - Location: Florida
   - Status: Available

5. The Hobbit
   - Author: J.R.R. Tolkien
   - Genre: Fantasy
   - Condition: Like New
   - Location: Washington
   - Status: Available

## Usage

1. Register a new account or use the predefined test accounts
2. Browse available books
3. Search for specific books using the search bar
4. View book details
5. Add new books (if you're a book owner)
6. Request book exchanges
7. Manage your books in the dashboard
