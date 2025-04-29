# 🎬 Lion's Den – Theater Management System

Lion’s Den is a modern full-stack web application designed to simulate a real-world theater experience for both customers and administrators. Built for the CMPS 383 Phase 3 assignment, it focuses on features like movie discovery, ticket booking, admin management, and analytics.

---

## 🌟 Features

### 👤 Public Functionality
- View all movies, showtimes, and details
- Filter by genres, ratings, or upcoming releases
- Book tickets with real-time seat availability
- Geolocation to detect nearest theater
- Mobile-responsive experience

### 🔐 User Features
- Authentication system (Login/Register)
- View past ticket history
- Manage profile and logout securely
- Guest checkout and ticket via email

### 🛠️ Admin Panel
- Dashboard with:
  - 🎟️ Total Tickets Sold  
  - 🎞️ Total Movies Listed  
  - 💰 Total Revenue  
  - 🔥 Most Watched Movies
- Movie management (Add, Edit, Delete)
- User management (View & control users)
- Settings panel for theme or email configurations
- Real-time preview of poster while adding movies
- Field-by-field validation & confirmation modals

---

## 🧑‍💻 Tech Stack

| Frontend              | Backend              | Database         |
|----------------------|----------------------|------------------|
| React + TypeScript   | ASP.NET Core Web API | SQL Server       |
| Vite + Tailwind CSS  | Entity Framework     | Seeded w/ data   |
| Axios + Context API  | Identity/Auth Roles  | RESTful Design   |

---

## 🚀 Getting Started

1. **Clone the Repo**
```bash 
git clone https://github.com/Anuraj235/Lions-Den-Theaters.git
Backend Setup

Navigate to /Selu383.SP25.P03.Api/

Update appsettings.json with your SQL connection string

Run migrations and start the API

Frontend Setup

bash
Copy
Edit
cd Selu383.SP25.P03.Web
npm install
npm run dev


📄 License
This project is for academic purposes under Southeastern Louisiana University. All rights reserved to Team Code 8848.



