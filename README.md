# 🎬 Movie Discovery & Rating App

A modern React + TypeScript movie application built with Vite and powered by The Movie Database (TMDB) API.

The app allows users to discover movies, search, view details, filter by genres, and manage a personal movie list with ratings and notes.

---

## 🚀 Features

- 🎬 Browse movies (Popular / Trending / Top Rated / Upcoming)
- 🔍 Live movie search with dropdown results
- 🎭 Filter movies by genres
- 📄 Movie details page
- ⭐ Personal movie list (My List)
- 📝 Add personal notes per movie
- 📊 Personal rating system (separate from TMDB rating)
- 💾 Persistent storage using localStorage
- ⚡ Loading / Error / Empty states handling
- 📱 Responsive UI

---

## 🧱 Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS
- TMDB API

---

## 🏗️ Architecture

The project follows a layered architecture:

UI Components  
↓  
Custom Hooks (state + logic)  
↓  
Services (API layer)  
↓  
TMDB API / LocalStorage

---
## 🎯 Core Concepts

- Separation of UI and business logic
- Custom hooks for reusable logic
- Service layer for API communication
- Centralized API client (Axios)
- LocalStorage-based personal data system

---

## 🧠 State Management

- Server state: TMDB API (movies, genres, search)
- Client state: My List (localStorage)

---

## ▶️ Getting Started

```bash
npm install
npm run dev

---

🔮 Future Improvements

User authentication system
Backend database for My List
Shareable lists between users
Pagination / infinite scroll optimization
Performance caching layer

📌 Notes
This project is built for learning and demonstrates:

React architecture design
Component composition
State management patterns
API integration patterns
