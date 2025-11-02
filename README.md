# 🚀 SpaceTrack - NASA Space Data Explorer

A full-stack web application for tracking and managing NASA space missions and observation activities. Built with Node.js, Express, and vanilla JavaScript.

![SpaceTrack](https://img.shields.io/badge/Version-1.0.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![License](https://img.shields.io/badge/License-Educational-yellow)

## 📋 Overview

SpaceTrack is a comprehensive data management system for NASA space missions, featuring:
- **Full CRUD Operations** for space activities
- **Real-time Data Visualization** with interactive charts
- **NASA API Integration** for live space data
- **Responsive Design** that works on all devices
- **AI Chatbot** for user assistance

---

## ✨ Features

### Core Functionality
- ✅ Create, Read, Update, Delete space observation activities
- ✅ Real-time search and filtering
- ✅8+ NASA missions with detailed information
- ✅ Interactive charts and statistics dashboard
- ✅ Integration with NASA's public APIs (APOD, NEO, Mars Rover)
- ✅ Mobile-responsive design

### Technical Features
- ✅ **MVC Architecture** - Clean separation of concerns
- ✅ **RESTful API** - Well-structured backend
- ✅ **Dynamic Frontend** - Real-time updates from backend
- ✅ **Error Handling** - Comprehensive validation
- ✅ **Auto-restart Server** - Nodemon for development
- ✅ **Botpress Chatbot** - Integrated AI assistance

---

## 🛠 Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Chart.js for data visualization
- Font Awesome icons
- Botpress chatbot integration

### Backend
- Node.js & Express.js
- MVC architecture
- RESTful API design
- CORS enabled
- Environment variables (dotenv)

### APIs
- NASA APOD (Astronomy Picture of the Day)
- NASA NEO (Near Earth Objects)
- NASA Mars Rover Photos

---

## 📁 Project Structure
```
SpaceTrack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── activityController.js
│   │   │   └── missionController.js
│   │   ├── models/
│   │   │   ├── Activity.js
│   │   │   └── Mission.js
│   │   └── routes/
│   │       ├── activityRoutes.js
│   │       ├── missionRoutes.js
│   │       └── nasaRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── crud/
│   ├── create.html
│   ├── read.html
│   ├── update.html
│   └── delete.html
├── js/
│   ├── main.js
│   ├── config.js
│   └── api.js
├── css/
│   └── styles.css
├── index.html
├── data-visualization.html
├── about.html
├── .gitignore
└── README.md
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/mudejayaprakash/Spacetrack-nasa-explorer.git
cd Spacetrack-nasa-explorer
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Configure Environment

Create `.env` file in `backend/` folder:
```env
PORT=3000
NODE_ENV=development
NASA_API_KEY=DEMO_KEY
FRONTEND_URL=http://127.0.0.1:5500
```

**Optional:** Get your own NASA API key at https://api.nasa.gov/

### Step 4: Start Backend Server
```bash
npm run dev
```

You should see:
```
🚀 SpaceTrack API Server
📡 Server running on: http://localhost:3000
```

### Step 5: Open Frontend

- **Option 1:** Use VS Code Live Server extension
- **Option 2:** Open `index.html` in your browser

---

## 💻 Usage

### API Endpoints

**Base URL:** `http://localhost:3000/api`

#### Activities
```bash
GET    /api/activities              # Get all activities
GET    /api/activities/:id          # Get activity by ID
GET    /api/activities?search=mars  # Search activities
POST   /api/activities              # Create activity
PUT    /api/activities/:id          # Update activity
DELETE /api/activities/:id          # Delete activity
```

#### Missions
```bash
GET /api/missions                # Get all missions
GET /api/missions/:id            # Get mission by ID
GET /api/missions/status/Active  # Get by status
GET /api/missions/type/Lunar     # Get by type
```

#### NASA APIs
```bash
GET /api/nasa/apod              # Astronomy Picture of Day
GET /api/nasa/neo               # Near Earth Objects
GET /api/nasa/mars-photos       # Mars Rover Photos
```

---

## 📊 API Examples

### Create Activity
```bash
POST http://localhost:3000/api/activities
Content-Type: application/json

{
  "missionId": 2,
  "type": "image",
  "date": "2025-10-30",
  "title": "Mars Surface Scan",
  "description": "High-resolution surface imaging",
  "location": "Mars - Jezero Crater"
}
```

### Search Activities
```bash
GET http://localhost:3000/api/activities?search=mars
```

### Get NASA APOD
```bash
GET http://localhost:3000/api/nasa/apod?date=2025-10-30
```

---

## 🎨 Features Showcase

### Dashboard
- Real-time statistics (Total Activities, Active Missions, Images, Observations)
- Activity type distribution chart
- Activities by mission chart
- Monthly activity timeline
- Recent activities table

### CRUD Operations
- **Create:** Add new space observation activities
- **Read:** View and search all activities
- **Update:** Modify existing activity details
- **Delete:** Remove activities with confirmation

### NASA Integration
- Live astronomy pictures
- Near-Earth asteroid tracking
- Mars Rover photo gallery

---

## 👥 Team

**Mudeja Prakash**
- Role: Full Stack Developer
- Contributions: Backend API, Frontend Integration, UI/UX Design

**Sanjana Kunduru**
- Role: Project Lead
- Contributions: Project Planning, Testing, Documentation

**Institution:** University of South Florida  
**Course:** ISM 6225 - Distributed Information Systems  
**Semester:** Spring 2025

---

## 📜 License

This project is created for educational purposes as part of ISM 6225 coursework.

---

## 🙏 Acknowledgments

- NASA for providing free public APIs
- University of South Florida
- ISM 6225 Faculty and Staff
- Botpress for chatbot integration

---

## 📧 Contact

**GitHub Repository:** https://github.com/mudejayaprakash/Spacetrack-nasa-explorer

---

## 🔮 Future Enhancements

- [ ] PostgreSQL database integration
- [ ] User authentication & authorization
- [ ] Real-time notifications
- [ ] Advanced data analytics
- [ ] Mobile app version
- [ ] Export data to PDF/Excel

---

**Made with ❤️ and ☕ by the SpaceTrack Team**