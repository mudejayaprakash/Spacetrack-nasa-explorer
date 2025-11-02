// Load environment variables
require('dotenv').config();
const path = require('path');

// Import dependencies
const express = require('express');
const cors = require('cors');

// Import routes
const activityRoutes = require('./src/routes/activityRoutes');
const missionRoutes = require('./src/routes/missionRoutes');
const nasaRoutes = require('./src/routes/nasaRoutes');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Import database
const { testConnection, syncDatabase } = require('./src/config/database');

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS (allow frontend to communicate with backend)
app.use(cors({
    origin: true,
    credentials: true
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));

// Log all requests (for debugging)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Serve static files from parent directory
app.use(express.static(path.join(__dirname, '..')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/images', express.static(path.join(__dirname, '../images')));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
app.use('/crud', express.static(path.join(__dirname, '../crud')));

// ============================================
// ROUTES
// ============================================

// Serve homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
});

// API health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        message: '🚀 SpaceTrack API is running!',
        version: '1.0.0',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        endpoints: {
            health: 'GET /api/health',
            api_info: 'GET /api',
            activities: 'GET /api/activities',
            missions: 'GET /api/missions',
            nasa: 'GET /api/nasa/info'
        }
    });
});

// API info endpoint
app.get('/api', (req, res) => {
    res.json({
        message: 'SpaceTrack API - NASA Space Data Explorer',
        version: '1.0.0',
        documentation: {
            activities: {
                'GET /api/activities': 'Get all activities (supports ?search, ?missionId, ?type)',
                'GET /api/activities/:id': 'Get activity by ID',
                'GET /api/activities/mission/:missionId': 'Get activities by mission',
                'POST /api/activities': 'Create new activity',
                'PUT /api/activities/:id': 'Update activity',
                'DELETE /api/activities/:id': 'Delete activity'
            },
            missions: {
                'GET /api/missions': 'Get all missions',
                'GET /api/missions/:id': 'Get mission by ID',
                'GET /api/missions/status/:status': 'Get missions by status',
                'GET /api/missions/type/:type': 'Get missions by type'
            },
            nasa: {
                'GET /api/nasa/info': 'NASA API information',
                'GET /api/nasa/apod': 'Astronomy Picture of the Day',
                'GET /api/nasa/neo': 'Near Earth Objects',
                'GET /api/nasa/mars-photos': 'Mars Rover Photos'
            }
        }
    });
});

// Mount route handlers
app.use('/api/activities', activityRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/nasa', nasaRoutes);

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.url}`,
        availableEndpoints: 'Visit GET /api/health or GET /api for documentation'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

// ============================================
// START SERVER WITH DATABASE CONNECTION
// ============================================

async function startServer() {
    try {
        // Test database connection
        console.log('🔌 Testing database connection...');
        const connected = await testConnection();
        
        if (!connected) {
            console.error('❌ Failed to connect to database. Please check your .env configuration.');
            process.exit(1);
        }
        
        // Sync database models
        console.log('🔄 Synchronizing database...');
        await syncDatabase();
        
        // Import and seed data AFTER sync
        const { seedProjects } = require('./src/models/Mission');
        const { seedObservations } = require('./src/models/Activity');

        await seedProjects();
        await seedObservations();
        
        // Start Express server
        app.listen(PORT, () => {
            console.log('=================================');
            console.log('🚀 SpaceTrack API Server');
            console.log('=================================');
            console.log(`📡 Server running on: http://localhost:${PORT}`);
            console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
            console.log(`🔗 Homepage: http://localhost:${PORT}/`);
            console.log(`📊 API docs: http://localhost:${PORT}/api`);
            console.log('=================================');
            console.log('📍 Available Endpoints:');
            console.log(`   Activities: http://localhost:${PORT}/api/activities`);
            console.log(`   Missions: http://localhost:${PORT}/api/missions`);
            console.log(`   NASA API: http://localhost:${PORT}/api/nasa/info`);
            console.log('=================================');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error.message);
        process.exit(1);
    }
}

// Start the server
startServer();