# SpaceTrack - NASA Space Data Explorer

A full-stack web application for tracking and managing NASA space missions and observation activities. Built with Node.js, Express, and vanilla JavaScript.

**Live Application:** [https://spacetrack.azurewebsites.net](https://spacetrack.azurewebsites.net)

![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Azure-blue)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![Deployed](https://img.shields.io/badge/Deployed-Azure-0078D4)

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technical Architecture](#technical-architecture)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Data Model & ERD](#data-model--erd)
- [CRUD Implementation](#crud-implementation)
- [NASA API Integration](#nasa-api-integration)
- [Azure Deployment](#azure-deployment)
- [Technical Challenges & Solutions](#technical-challenges--solutions)
- [Technologies Used](#technologies-used)
- [Team](#team)
- [Installation & Setup](#installation--setup)

---

## Project Overview

SpaceTrack is a full-stack web application that enables users to manage space observation activities, track NASA missions, and access real-time space data. Built with **Node.js**, **Express**, **PostgreSQL**, and deployed on **Microsoft Azure**, it demonstrates complete MVC architecture with full CRUD operations and external API integration.

### Key Objectives
- Transform static website into dynamic full-stack application
- Implement MVC architecture with separation of concerns
- Create complete CRUD operations for data management
- Integrate NASA's public APIs for live space data
- Deploy to Microsoft Azure with cloud database
- Provide data visualization and analytics

---

## Features

### Core Functionality
- **Full CRUD Operations**: Create, Read, Update, Delete for observation activities and space missions
- **Real-time NASA Data**: Live astronomy pictures, near-earth objects, ISS location tracking
- **Data Visualization**: Interactive charts showing activity trends, mission statistics, and observation analytics
- **Search & Filter**: Dynamic search and filtering capabilities across all data
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Cloud Deployment**: Fully hosted on Microsoft Azure with PostgreSQL database

### Technical Features
- **MVC Architecture**: Clean separation of Models, Views, and Controllers
- **RESTful API**: Well-structured backend API with proper HTTP methods
- **Database Persistence**: PostgreSQL database on Azure with Sequelize ORM
- **Error Handling**: Comprehensive validation and error management
- **CORS Enabled**: Secure cross-origin resource sharing
- **Environment Configuration**: Secure credential management

---

## Technical Architecture

SpaceTrack implements the **Model-View-Controller (MVC)** design pattern:
```
┌─────────────────────────────────────────────────────────┐
│                     FRONTEND (View)                      │
│  HTML5 + CSS3 + Vanilla JavaScript + Chart.js           │
└────────────────────┬────────────────────────────────────┘
                     │ HTTP/AJAX Requests
                     ↓
┌─────────────────────────────────────────────────────────┐
│                  BACKEND (Controller)                    │
│              Node.js + Express.js                        │
│  Routes → Controllers → Models                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────────────────┐
│             DATABASE (Model Storage)                     │
│         PostgreSQL on Azure Database                     │
└─────────────────────────────────────────────────────────┘
```

---

## Project Structure
```
SpaceTrack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # PostgreSQL connection
│   │   ├── controllers/
│   │   │   ├── activityController.js # Activity CRUD logic
│   │   │   ├── missionController.js  # Mission CRUD logic
│   │   │   └── nasaController.js     # NASA API integration
│   │   ├── models/
│   │   │   ├── Activity.js           # Activity Sequelize model
│   │   │   └── Mission.js            # Mission Sequelize model
│   │   └── routes/
│   │       ├── activityRoutes.js     # Activity API routes
│   │       ├── missionRoutes.js      # Mission API routes
│   │       └── nasaRoutes.js         # NASA API routes
│   ├── node_modules/                 # Dependencies
│   ├── server.js                     # Express app entry point
│   ├── package.json                  # Backend dependencies
│   └── .env                          # Environment variables
├── crud/
│   ├── create.html                   # Create observations
│   ├── read.html                     # View all observations
│   ├── update.html                   # Edit observations
│   └── delete.html                   # Delete observations
├── css/
│   └── styles.css                    # Application styling
├── images/
│   ├── data-model.png                # ERD diagram
│   ├── kaylee.jpeg                   # Team photos
│   ├── mude.jpeg
│   ├── mythily.jpeg
│   └── pradeep.jpeg
├── js/
│   ├── api.js                        # API client functions
│   ├── botpress.js                   # Chatbot integration
│   ├── charts.js                     # Data visualization
│   ├── config.js                     # Frontend API config
│   └── main.js                       # Main frontend logic
├── .deployment                       # Azure deployment config
├── .gitignore                        # Git ignore rules
├── about.html                        # About us / Team page
├── data-visualization.html           # Analytics dashboard
├── data.json                         # Sample data
├── index.html                        # Homepage/Dashboard
├── nasa-data.html                    # Live NASA data page
├── README.md                         # This file
├── startup.sh                        # Azure startup script
└── web.config                        # Azure configuration
```

---

## API Endpoints

### Base URL
```
Production: https://spacetrack.azurewebsites.net/api
Local: http://localhost:3000/api
```

### Activities Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/activities` | Get all observations |
| GET | `/api/activities/:id` | Get single observation |
| POST | `/api/activities` | Create new observation |
| PUT | `/api/activities/:id` | Update observation |
| DELETE | `/api/activities/:id` | Delete observation |

**POST/PUT Request Body:**
```json
{
  "title": "Jupiter Opposition Observation",
  "category": "Planet",
  "date": "2025-11-02",
  "location": "Backyard Observatory, Tampa FL",
  "description": "Observed Jupiter at opposition. Great Ganymede visibility.",
  "rating": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Jupiter Opposition Observation",
    "category": "Planet",
    "date": "2025-11-02",
    "location": "Backyard Observatory, Tampa FL",
    "description": "Observed Jupiter at opposition...",
    "rating": 5,
    "createdAt": "2025-11-02T10:30:00.000Z",
    "updatedAt": "2025-11-02T10:30:00.000Z"
  }
}
```

---

### Missions Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/missions` | Get all space missions |
| GET | `/api/missions/:id` | Get single mission |
| POST | `/api/missions` | Create new mission |
| PUT | `/api/missions/:id` | Update mission |
| DELETE | `/api/missions/:id` | Delete mission |

---

### NASA Live Data Endpoints

| Method | Endpoint | Description | External API |
|--------|----------|-------------|--------------|
| GET | `/api/nasa/apod` | Astronomy Picture of the Day | NASA APOD API |
| GET | `/api/nasa/neo` | Near Earth Objects | NASA NeoWs API |
| GET | `/api/nasa/iss-location` | ISS real-time location | Open Notify ISS API |

### External NASA APIs Used

1. **NASA APOD API**
   - URL: `https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}`
   - Provides: Daily astronomy images with explanations

2. **NASA NeoWs API**
   - URL: `https://api.nasa.gov/neo/rest/v1/feed?start_date={date}&api_key={NASA_API_KEY}`
   - Provides: Asteroid data and close approach information

3. **Open Notify ISS API**
   - URL: `http://api.open-notify.org/iss-now.json`
   - Provides: Real-time ISS coordinates

---

## Data Model & ERD

### Entity Relationship Diagram

![ERD Diagram](images/data-model.png)

### Database Schema

#### Activities Table
```sql
CREATE TABLE "Activities" (
  "id" SERIAL PRIMARY KEY,
  "title" VARCHAR(255) NOT NULL,
  "category" VARCHAR(100),
  "date" DATE NOT NULL,
  "location" VARCHAR(255),
  "description" TEXT,
  "rating" INTEGER CHECK ("rating" >= 1 AND "rating" <= 5),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

#### Missions Table
```sql
CREATE TABLE "Missions" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "agency" VARCHAR(100),
  "launchDate" DATE,
  "status" VARCHAR(50) CHECK ("status" IN ('Planned', 'Active', 'Completed')),
  "description" TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## CRUD Implementation

### CREATE Operations

**Backend Controller** (`activityController.js`):
```javascript
exports.createActivity = async (req, res) => {
  try {
    const { title, category, date, location, description, rating } = req.body;
    
    const activity = await Activity.create({
      title, category, date, location, description, rating
    });
    
    res.status(201).json({
      success: true,
      message: 'Activity created successfully',
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create activity',
      error: error.message
    });
  }
};
```

---

### READ Operations
```javascript
// Get all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      order: [['date', 'DESC']]
    });
    
    res.json({
      success: true,
      count: activities.length,
      data: activities
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
```

---

### UPDATE Operations
```javascript
exports.updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    await activity.update(req.body);
    
    res.json({
      success: true,
      message: 'Activity updated successfully',
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

---

### DELETE Operations
```javascript
exports.deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByPk(req.params.id);
    
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }
    
    await activity.destroy();
    
    res.json({
      success: true,
      message: 'Activity deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

---

## NASA API Integration

### Backend Implementation

**NASA Controller** (`nasaController.js`):
```javascript
const fetch = require('node-fetch');
const NASA_API_KEY = process.env.NASA_API_KEY;

// Astronomy Picture of the Day
exports.getAPOD = async (req, res) => {
  try {
    const { date } = req.query;
    let url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;
    if (date) url += `&date=${date}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({
      success: true,
      data: data,
      source: 'NASA APOD API'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Astronomy Picture of the Day',
      error: error.message
    });
  }
};

// Near Earth Objects
exports.getNearEarthObjects = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`;
    
    const response = await fetch(url);
    const data = await response.json();
    
    res.json({
      success: true,
      data: data,
      source: 'NASA NeoWs API'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Near Earth Objects',
      error: error.message
    });
  }
};

// ISS Location
exports.getISSLocation = async (req, res) => {
  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json');
    const data = await response.json();
    
    res.json({
      success: true,
      data: data,
      source: 'Open Notify ISS API'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ISS location',
      error: error.message
    });
  }
};
```

---

## Azure Deployment

### Azure Components

1. **Azure App Service** (F1 Free Tier)
   - Runtime: Node.js 20 LTS
   - Region: West US 3
   - Cost: $0/month

2. **Azure Database for PostgreSQL** (Basic Tier)
   - Compute: Basic, 1 vCore
   - Storage: 5GB
   - SSL: Required
   - Cost: ~$18-20/month

3. **Resource Group**: `spacetrack-rg`

### Environment Configuration
```bash
NODE_ENV=production
PORT=8080
DB_HOST=spacetrack-db.postgres.database.azure.com
DB_USER=spacetrackadmin
DB_NAME=postgres
DB_PORT=5432
DB_PASSWORD=[secure password]
NASA_API_KEY=[NASA API key]
```

### Deployment Commands
```bash
# Create resource group
az group create --name spacetrack-rg --location westus3

# Create PostgreSQL server
az postgres server create \
  --resource-group spacetrack-rg \
  --name spacetrack-db \
  --location westus3 \
  --admin-user spacetrackadmin \
  --admin-password [secure password] \
  --sku-name B_Gen5_1

# Create App Service Plan
az appservice plan create \
  --name spacetrack-plan \
  --resource-group spacetrack-rg \
  --location westus3 \
  --sku F1 \
  --is-linux

# Create Web App
az webapp create \
  --resource-group spacetrack-rg \
  --plan spacetrack-plan \
  --name spacetrack \
  --runtime "NODE:20-lts"
```

### Startup Command
```bash
cd /home/site/wwwroot/backend && npm install --production && node server.js
```

---

## Technical Challenges & Solutions

### Challenge 1: Azure Deployment Failures

**Problem:** Multiple deployment methods failed (ZIP, Git, File Upload)

**Solution:** Manual deployment via Kudu Bash terminal
```bash
cd /home/site/wwwroot
wget https://github.com/mudejayaprakash/Spacetrack-nasa-explorer/archive/refs/heads/main.tar.gz
tar -xzf main.tar.gz
cp -r Spacetrack-nasa-explorer-main/* .
cd backend && npm install
```

---

### Challenge 2: Node-Fetch Import Issues

**Problem:** node-fetch v3 uses ES modules, Azure expected CommonJS

**Solution:** Downgraded to node-fetch v2
```bash
npm uninstall node-fetch
npm install node-fetch@2
```

Updated code:
```javascript
const fetch = require('node-fetch');  // Instead of import
```

---

### Challenge 3: JavaScript Syntax Errors

**Problem:** Template literal syntax errors throughout codebase

**Wrong:**
```javascript
console.log`Server running on port ${PORT}`);
fetch`https://api.nasa.gov/...`);
```

**Correct:**
```javascript
console.log(`Server running on port ${PORT}`);
fetch(`https://api.nasa.gov/...`);
```

**Solution:** Used sed commands to fix
```bash
sed -i 's|console.log`|console.log(`|g' server.js
sed -i 's|await fetch`|await fetch(`|g' nasaController.js
```

---

### Challenge 4: Frontend API Configuration

**Problem:** Hardcoded localhost URLs failed in production

**Solution:** Dynamic API configuration
```javascript
// config.js
const CONFIG = {
    API_BASE_URL: window.location.origin + '/api',
    ENDPOINTS: {
        activities: '/activities',
        missions: '/missions',
        nasa: '/nasa'
    }
};
```

---

### Challenge 5: PostgreSQL Connection Issues

**Problem:** Database refused connections without SSL

**Solution:** Configured SSL in Sequelize
```javascript
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});
```

---

### Challenge 6: Visual Consistency in UI

**Problem:** Cards had inconsistent heights with varying content

**Solution:** CSS Grid with fixed heights
```css
.observation-card {
  display: grid;
  grid-template-rows: auto 1fr auto auto;
  min-height: 400px;
  max-height: 400px;
}
```

---

## Technologies Used

### Backend
- **Node.js v20.x** - JavaScript runtime
- **Express.js v4.x** - Web framework
- **Sequelize ORM** - Database management
- **PostgreSQL** - Relational database
- **node-fetch v2** - HTTP client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling
- **Vanilla JavaScript (ES6+)** - Client logic
- **Chart.js** - Data visualization
- **Fetch API** - AJAX requests

### Cloud & DevOps
- **Microsoft Azure**
  - App Service (F1 Free Tier)
  - PostgreSQL Database (Basic Tier)
  - Kudu (Deployment Engine)
- **Azure CLI** - Cloud management
- **Git/GitHub** - Version control

### External APIs
- **NASA APOD API** - Astronomy pictures
- **NASA NeoWs API** - Near Earth Objects
- **Open Notify ISS API** - ISS tracking

---

## Team

### Team Members

**Mude Jayaprakash Naik**
- **Role:** Full Stack Developer
- **U Number:** U74012463
- **Contributions:**
  - Created chatbot integration
  - Designed logical data model and ERD
  - Coordinated team collaboration through GitHub
  - Code debugging and troubleshooting
  
**Kaylee Eckelman**
- **Role:** Data Visualization Specialist
- **U Number:** U53871537
- **Contributions:**
  - Created dummy datasets for testing
  - Developed interactive data visualizations using Chart.js
  - Dashboard analytics implementation
  
**Pradeep Anand Mohanasundaram**
- **Role:** Backend Developer & QA
- **U Number:** U58770856
- **Contributions:**
  - Implemented CRUD operations
  - Enhanced UI design
  - Quality assurance and testing
  - Ensured accessibility across all pages

**Mythily Kanagaraj**
- **Role:** Frontend Developer & UI/UX Designer
- **U Number:** U15860523
- **Contributions:**
  - Created UI design
  - Managed GitHub repository
  - Merged code from collaborators
  - Frontend styling and responsiveness

**Institution:** University of South Florida  
**Course:** ISM 6225 - Distributed Information Systems  
**Semester:** Fall 2025

---

## Installation & Setup

### Prerequisites
- Node.js v20 or higher
- PostgreSQL
- Git

### Local Development Setup

**1. Clone Repository:**
```bash
git clone https://github.com/mudejayaprakash/Spacetrack-nasa-explorer.git
cd Spacetrack-nasa-explorer
```

**2. Install Backend Dependencies:**
```bash
cd backend
npm install
```

**3. Configure Environment:**

Create `.env` file in `backend/` folder:
```env
PORT=3000
NODE_ENV=development
NASA_API_KEY=your_nasa_api_key
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=spacetrack
DB_PORT=5432
```

**4. Start Backend Server:**
```bash
npm start
```

**5. Open Frontend:**
Open `index.html` in your browser or use Live Server

---

## License

This project was created for educational purposes as part of ISM 6225 coursework at the University of South Florida.

---

## Acknowledgments

- **NASA** for providing free public APIs
- **Microsoft Azure** for student credits
- **University of South Florida** - ISM 6225 Faculty
- **Stack Overflow Community** for troubleshooting support

---

## Contact & Links

**Live Application:** [https://spacetrack.azurewebsites.net](https://spacetrack.azurewebsites.net)

**GitHub Repository:** [https://github.com/mudejayaprakash/Spacetrack-nasa-explorer](https://github.com/mudejayaprakash/Spacetrack-nasa-explorer)



*Made with ❤️ by the SpaceTrack Team*  
*University of South Florida | ISM 6225 | Fall 2025*
---
