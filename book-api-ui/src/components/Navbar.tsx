import { useContext, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";
//TODO add the about page to center screen on desktop
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useContext(AuthContext);

  return (
    <nav className="w-full bg-black text-white shadow-2xl">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          BookInfoApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          <Link to="/" className="hover:text-gray-300 text-lg">
            Home
          </Link>
          <Link
            to="/add-book"
            hidden={!isAdmin}
            className="hover:text-gray-300 text-lg"
          >
            Add Book
          </Link>
          <Link to="/about" className="hover:text-gray-300 text-lg">
            About
          </Link>
          <Link to="/login">
            <button className="bg-white text-black px-5 py-2 rounded-lg hover:bg-gray-200 transition">
              Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-1 bg-white mb-1" />
          <div className="w-6 h-1 bg-white mb-1" />
          <div className="w-6 h-1 bg-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className="block py-2 px-3 rounded-md hover:bg-gray-800"
            >
              Home
            </Link>
            <Link
              to="/add-book"
              className="block py-2 px-3 rounded-md hover:bg-gray-800"
            >
              Add Book
            </Link>
            <Link
              to="/about"
              className="block py-2 px-3 rounded-md hover:bg-gray-800"
            >
              About
            </Link>
            <Link to="/login">
              <button className="w-full text-left px-3 py-2 bg-white text-black rounded-lg hover:bg-gray-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
