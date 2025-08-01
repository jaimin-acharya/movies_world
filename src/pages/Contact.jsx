import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", form);
    // Optionally integrate EmailJS, Formspree, or backend
  };

  return (
    <section className="wrapper py-10 flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center max-w-lg w-full px-4">
        <h2 className="text-4xl font-semibold text-white mb-6 text-center">
          Contact Us
        </h2>
        <p className="text-gray-300 mb-8 text-center">
          Feel free to contact us for
          <span className="font-medium text-purple-400 p-1">
            Movie Recommendations
          </span>
          , feature suggestions, or any changes you'd like to see on our
          platform. We're always listening!
        </p>

        <div className="w-full bg-dark-100 p-6 rounded-lg shadow-inner shadow-light-100/10 space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your Name"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-purple-400 bg-light-100/5 border-gray-700 text-white transition duration-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Your Email"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-purple-400 bg-light-100/5 border-gray-700 text-white transition duration-200"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-gray-300 font-medium">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
              placeholder="Your Message"
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 placeholder:text-gray-500 focus:ring-purple-400 bg-light-100/5 border-gray-700 text-white resize-none transition duration-200"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="cursor-pointer w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-md transition duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
