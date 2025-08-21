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

  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="mt-0 bg-transparent">
      <div className="relative max-w-7xl mx-auto px-0 sm:px-2">
        <div className="flex items-center justify-between p-1 h-16">
          <NavLink to="/" onClick={closeMenu}>
            <div className="text-2xl font-bold text-white flex justify-center items-center">
              <img
                src="/logo.png"
                alt="Movies World"
                className="w-19 h-full p-0 m-0 z-30"
              />
              <h1 className="text-xl sm:text-2xl z-30 text-white">Movies World</h1>
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
            className="lg:hidden z-30 text-white hover:text-gray-300 focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Backdrop overlay with blur */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 lg:hidden"
            onClick={closeMenu}
          />
        )}

        {/* Menu */}
        <div
          className={`absolute w-full z-30 lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-96 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          } overflow-hidden`}
        >
          <nav className="px-2 pt-2 pb-2 space-y-1 backdrop-blur-md border-2 border-white/20 text-center rounded-lg mt-2">
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
