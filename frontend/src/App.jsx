import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import Dashboard from "./pages/Dashboard";
import BookDetails from "./components/BookDetails";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {user && !["/books"].includes(window.location.pathname) && (
          <Navbar user={user} onLogout={handleLogout} />
        )}
        <div
          className={
            window.location.pathname === "/books"
              ? ""
              : "container mx-auto px-4 py-8"
          }
        >
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <BookList user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={
                user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
              }
            />
            <Route
              path="/register"
              element={
                user ? (
                  <Navigate to="/" />
                ) : (
                  <Register onRegister={handleLogin} />
                )
              }
            />
            <Route
              path="/books"
              element={user ? <BookList /> : <Navigate to="/" />}
            />
            <Route
              path="/dashboard"
              element={
                user && user.role === "admin" ? (
                  <Dashboard user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/add-book"
              element={
                user && user.role === "owner" ? (
                  <AddBook user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              path="/books/:id"
              element={
                user ? (
                  <BookDetails user={user} onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
