import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./../../firebase";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="mt-0 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-2">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" onClick={closeMenu}>
            <div className="text-2xl font-bold text-white flex justify-center items-center">
              <img
                src="/logo.png"
                alt="Movies World"
                className="w-19 h-full p-0 m-0"
              />
              <h1 className="text-xl sm:text-2xl text-white">Movies World</h1>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center space-x-9 text-lg">
            <NavLink
              to="/"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              Movies
            </NavLink>
            <NavLink
              to="/series"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              TV Series
            </NavLink>
            <NavLink
              to="/wishlist"
              className="block px-3 py-2 text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              WishList
            </NavLink>
            <NavLink
              to="/about"
              className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
            >
              About
            </NavLink>

            {!user && (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
              >
                Login
              </NavLink>
            )}
          </nav>

          <button
            onClick={toggleMenu}
            className="lg:hidden text-white hover:text-gray-300 focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          } overflow-hidden`}
        >
          <nav className="h-full px-2 pt-2 pb-4 space-y-1 bg-white/10 backdrop-blur-md border-b border-white/20 text-center bg-opacity-90 rounded-lg mt-2">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
            >
              Home
            </NavLink>
            <NavLink
              to="/movies"
              onClick={closeMenu}
              className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
            >
              Movies
            </NavLink>
            <NavLink
              to="/series"
              onClick={closeMenu}
              className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
            >
              TV Series
            </NavLink>
            <NavLink
              to="/wishlist"
              onClick={closeMenu}
              className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
            >
              WishList
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
            >
              About
            </NavLink>

            {!user && (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="block px-3 py-2 text-white hover:text-gradient font-medium transition-colors duration-300 rounded-md hover:bg-gray-800"
              >
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
