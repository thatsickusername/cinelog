
<!--
  README.md for CineLog
  Generate dynamic badges with Shields.io and GitHub meta.
-->

<!-- Badges -->
<p align="center">
  <img src="https://img.shields.io/github/last-commit/thatsickusername/cinelog" alt="Last Commit" />
  <img src="https://img.shields.io/github/languages/top/thatsickusername/cinelog" alt="Top Language" />
  <img src="https://img.shields.io/github/license/thatsickusername/cinelog" alt="License: MIT" />
  <img src="https://img.shields.io/badge/TMDb-API-blue" alt="TMDb API" />
  <img src="https://img.shields.io/badge/Firebase-Firestore-orange" alt="Firebase Firestore" />
  <img src="https://img.shields.io/badge/React-17.0.0-blueviolet" alt="React" />
</p>

# 🎬 CineLog

CineLog is a modern, social‑driven movie web app. It combines **The Movie Database (TMDb)** data with user reviews, personalized watchlists, and public profiles — all without writing your own backend.  

---

## 🎯 The Problem We’re Solving

> Movie fans want a one‑stop place to discover, track, and discuss films.  
>  
> - ❌ TMDb/IMDb show data but lack personal notes or community reviews.  
> - ❌ Standalone review sites have limited or outdated metadata.  
> - ❌ Building a full backend for auth, reviews, and storage is time‑consuming.  

**CineLog** bridges that gap by:
1. **Surfacing rich movie metadata** (backdrops, cast, genres, runtime).  
2. **Empowering users** to add/remove movies in a watchlist.  
3. **Enabling community reviews** (title + body + star rating).  
4. **Providing public profile pages** for each user — all powered by TMDb + Firebase.

---

## ✨ Features

- **🔒 Google Auth**: Sign in securely via Firebase Auth
- **📽️ TMDb Integration**: Fetch movie details, images, cast & crew
- **⭐ Star Ratings & Reviews**: One review per user per movie (heading + full text + star rating)
- **📋 Watchlist**: Add & remove favorites, paginated to avoid overload
- **👤 Public Profiles**: Each user has a page showing their watchlist & written reviews
- **⚡ Performance**: Client‑side caching, Firestore pagination, skeleton loading states

---

## 🖼️ Screenshots

> _Place your screenshots here to showcase the UI_  

<!-- ![Home Page](./screenshots/home.png) -->
<!-- ![Movie Details](./screenshots/details.png) -->
<!-- ![Profile Page](./screenshots/profile.png) -->

---

## 🛠 Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| **Frontend**   | React, React Router, Vite                 |
| **Styling**    | Custom CSS (glassmorphism, flex/grid)     |
| **Movie Data** | TMDb API                                  |
| **Auth & DB**  | Firebase Auth, Firestore, Firebase Storage|
| **Hosting**    | Vite Dev Server / Production Build        |

---

## 🚀 Quick Start

1. **Clone & Install**
   ```bash
   git clone https://github.com/thatsickusername/cinelog.git
   cd cinelog
   npm install
   ```

2. **Configure Environment**
   - Copy `.env.example` to `.env.local`
   - Fill in your keys:
     ```bash
     VITE_TMDB_API_KEY=your_tmdb_api_key
     VITE_FIREBASE_API_KEY=...
     VITE_FIREBASE_AUTH_DOMAIN=...
     VITE_FIREBASE_PROJECT_ID=...
     VITE_FIREBASE_STORAGE_BUCKET=...
     VITE_FIREBASE_MESSAGING_SENDER_ID=...
     VITE_FIREBASE_APP_ID=...
     ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```
   Deploy `dist/` to your hosting of choice.

---

## 📁 Repository Structure

```
cinelog/
├── public/                 # Static assets, favicon
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # Auth & app context providers
│   ├── hooks/              # Custom React hooks (useMovies, useAuth, useFirestore)
│   ├── pages/              # Route‑level pages (Home, Details, Profile, Login)
│   ├── services/           # API & Firestore functions
│   ├── styles/             # CSS modules or global styles
│   ├── App.jsx             # Route definitions & layout
│   └── main.jsx            # App entry point
├── .env.example            # Environment variables template
├── package.json
├── README.md
└── vite.config.js
```

---

## 🧭 Next Steps

- [ ] Edit/Delete user reviews  
- [ ] Like/upvote reviews  
- [ ] Theming: Dark/Light mode toggle  
- [ ] Social sharing & deep links  

---

## 🤝 Contributing

Contributions are welcome!  
1. Fork the repo  
2. Create a feature branch  
3. Open a pull request  

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📜 License

This project is licensed under the **MIT License**.  
See [LICENSE](./LICENSE) for details.

---

<p align="center">
  Built with ❤️ by Manish Pandey
</p>
