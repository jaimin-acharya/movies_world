# 🎥 Movies World

## Welcome to **Movies World** – a modern movie browsing platform that allows users to explore trending movies and series, manage wishlists, and enjoy a seamless movie discovery experience.

---

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)    
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)    
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase&logoColor=white)    
![Appwrite](https://img.shields.io/badge/appwrite-%23F02E65.svg?style=for-the-badge&logo=appwrite&logoColor=white)    
![React Router](https://img.shields.io/badge/React_Router-%23CA4245.svg?style=for-the-badge&logo=react-router&logoColor=white)  


---

![Movies World Banner](./public/moviesworld.png)

## 🌐 Live

🔗 [Visit Movies World](https://infomoviesworld.vercel.app/)

---

![React](https://img.shields.io/badge/React-2025-blue)
![Firebase](https://img.shields.io/badge/Firebase-Auth-yellow)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38BDF8)
![License: MIT](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

- 🔍 Search for movies and TV shows
- 📺 View trending and popular movies/series
- ❤️ Add/remove movies to/from your wishlist
- 🔐 Protected routes using Firebase Authentication
- 📱 Fully responsive and accessible UI
- ✨ Smooth animations and polished visuals
- 📤 Email verification, forgot password, and login

---

## 🧰 Tech Stack

| Category       | Tech Used                                                      |
| -------------- | -------------------------------------------------------------- |
| 🧑‍💻 Frontend    | [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| 🌐 Routing     | [React Router DOM](https://reactrouter.com/)                   |
| 🎨 Styling     | [Tailwind CSS](https://tailwindcss.com/)                       |
| 🔐 Auth        | Firebase Authentication + OTP Login                            |
| 📦 Backend API | [Appwrite](https://appwrite.io/)                               |
| 📁 State Mgmt  | React useState/useEffect (or Context if extended)              |
| 🍿 Data        | TMDb API (The Movie Database)                                  |
| 🚀 Deployment  | [Vercel](https://vercel.com/)                                  |

---

## 📁 Folder Structure

```bash
movies_world/
├── public/
│   └── moviesworld.png        # Banner image
├── src/
│   ├── api/                   # API logic (e.g., TMDb functions)
│   ├── assets/                # Static assets like logos
│   ├── components/
│   │   ├── Layout/            # App layout (header, footer)
│   │   ├── Ui/
│   │   │   ├── Movies/        # Movie cards, lists
│   │   │   └── TvSeries/      # TV-specific components
│   ├── pages/                 # Route pages (home, login, signup, etc.)
│   ├── App.jsx                # Main app component
│   ├── firebase.js            # Firebase config
│   ├── appwrite.js            # Appwrite config (if used)
├── .env.example               # Environment variables template
├── vite.config.js
└── README.md
```

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jaimin-acharya/movies_world.git
cd movies_world
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Environment Variables

Create a `.env` file and add your Firebase, Appwrite, and TMDb API keys:

```env
# TMDB API
VITE_TMDB_API_KEY=YOUR_API_KEY

# APPWRITE
VITE_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID
VITE_APPWRITE_DATABASE_ID=YOUR_DATABASE_ID
VITE_APPWRITE_COLLECTION_ID=YOUR_COLLECTION_ID

# FIREBASE
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_DOMAIN=YOUR_FIREBASE_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
```

### 4. Run the App Locally

```bash
npm run dev
```

App will be available at:
👉 `http://localhost:5173`

---

## ✅ How to Use

- Visit homepage to explore trending movies and TV shows
- Use the search bar for specific titles
- Sign up or log in to unlock wishlist features
- Add/remove movies from your wishlist
- Use password reset and email verification features
- Access protected routes only after login
- Mobile-friendly, responsive layout for any device

---

## 👨‍💻 Author

**Jaimin Acharya**

- GitHub: [@jaimin-acharya](https://github.com/jaimin-acharya)
- Email: [jaiminacharya9@gmail.com](mailto:jaiminacharya9@gmail.com)
- Portfolio: [https://jaiminacharya.vercel.app](https://jaiminacharya.vercel.app)

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 🔗 Live Demo

👉 [Movies World on Vercel](https://infomoviesworld.vercel.app/)

---

Made with ❤️ using React, Vite, Firebase & Tailwind CSS.
