import {
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <footer className="mt-15 border-t border-light-100/10 p-2">
      <div className="wrapper">
        <div className="py-16 ">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12  mb-20 items-center justify-center">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="font-bold  justify-center items-center ">
                <NavLink to="/">
                  <h1 className="text-4xl text-gradient flex justify-start items-center">
                    Movies World
                  </h1>
                </NavLink>
              </div>
              <p className="text-gray-100 text-sm leading-relaxed font-dm-sans">
                Your ultimate destination for the latest movies and TV series.
                Discover, watch, and enjoy premium entertainment content.
              </p>
              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/jaiminacharya333"
                  target="_blank"
                  className="w-10 h-10 bg-light-100/5 hover:bg-gradient-to-r hover:bg-[#AB8BFF] rounded-full flex items-center justify-center transition-all duration-300 border border-light-100/20"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://x.com/JaiminAcha3064"
                  target="_blank"
                  className="w-10 h-10 bg-light-100/5 hover:bg-gradient-to-r hover:bg-[#AB8BFF] rounded-full flex items-center justify-center transition-all duration-300 border border-light-100/20"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/jaiminacharya9/"
                  target="_blank"
                  className="w-10 h-10 bg-light-100/5 hover:bg-gradient-to-r hover:bg-[#AB8BFF] rounded-full flex items-center justify-center transition-all duration-300 border border-light-100/20"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://github.com/jaimin-acharya"
                  target="_blank"
                  className="w-10 h-10 bg-light-100/5 hover:bg-gradient-to-r hover:bg-[#AB8BFF] rounded-full flex items-center justify-center transition-all duration-300 border border-light-100/20"
                >
                  <Github className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white font-dm-sans">
                Quick Links
              </h3>
              <nav className="flex flex-col space-y-3">
                <a
                  href="/"
                  className="text-gray-100 hover:text-white text-sm font-medium transition-colors duration-200 font-dm-sans"
                >
                  Home
                </a>
                <a
                  href="/about"
                  className="text-gray-100 hover:text-white text-sm font-medium transition-colors duration-200 font-dm-sans"
                >
                  About Us
                </a>
                <a
                  href="/movies"
                  className="text-gray-100 hover:text-white text-sm font-medium transition-colors duration-200 font-dm-sans"
                >
                  Movies
                </a>
                <a
                  href="/series"
                  className="text-gray-100 hover:text-white text-sm font-medium transition-colors duration-200 font-dm-sans"
                >
                  TV Series
                </a>
                <a
                  href="/contact"
                  className="text-gray-100 hover:text-white text-sm font-medium transition-colors duration-200 font-dm-sans"
                >
                  Contact
                </a>
              </nav>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white font-dm-sans">
                Categories
              </h3>
              <nav className="flex flex-col space-y-3">
                {["Action", "Comedy", "Drama", "Thriller", "Sci-Fi"].map(
                  (category) => (
                    <a
                      key={category}
                      href={`movies?search=${category.toLowerCase()}&page=1`}
                      className="text-sm font-medium text-gray-100 hover:text-white transition duration-200 font-dm-sans"
                    >
                      {category}
                    </a>
                  )
                )}
              </nav>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white font-dm-sans">
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-light-100/10 rounded-full flex items-center justify-center border border-light-100/20">
                    <Mail className="w-4 h-4 text-light-200" />
                  </div>
                  <a
                    href="mailto:jaiminacharya333@gmail.com"
                    className="text-gray-100 text-sm font-dm-sans hover:underline"
                  >
                    jaiminacharya333@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-light-100/10 rounded-full flex items-center justify-center border border-light-100/20">
                    <Phone className="w-4 h-4 text-light-200" />
                  </div>
                  <span className="text-gray-100 text-sm font-dm-sans">
                    +91 9106212679
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-light-100/10 rounded-full flex items-center justify-center border border-light-100/20">
                    <MapPin className="w-4 h-4 text-light-200" />
                  </div>
                  <span className="text-gray-100 text-sm font-dm-sans">
                    Palitana, Gujarat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="border-t border-light-100/10 pt-8 mb-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-white font-dm-sans">
                Stay Updated
              </h3>
              <p className="text-gray-100 text-sm font-dm-sans">
                Subscribe to get notified about new releases and exclusive
                content
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full sm:flex-1 px-4 py-3 bg-light-100/5 border border-light-100/20 rounded-lg text-white placeholder-light-200 outline-none focus:border-light-100/40 transition-colors duration-200 font-dm-sans"
                />
                <button className="w-full sm:w-auto px-6 py-3 bg-[#AB8BFF] text-white rounded-lg font-boldshadow-inner shadow-light-100/10">
                  Subscribe
                </button>
              </div>
            </div>
          </div> */}

        {/* Bottom Bar */}
        <div className="border-t border-light-100/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-100 text-sm font-dm-sans">
              © 2025 Movies World. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-100 hover:text-white text-sm transition-colors duration-200 font-dm-sans"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-white text-sm transition-colors duration-200 font-dm-sans"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-100 hover:text-white text-sm transition-colors duration-200 font-dm-sans"
              >
                DMCA
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
