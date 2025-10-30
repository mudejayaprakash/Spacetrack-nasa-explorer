/**
 * Mission Routes
 * Define all mission-related API endpoints
 */

const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// ============================================
// MISSION ROUTES
// ============================================

// READ - GET /api/missions
router.get('/', missionController.getAllMissions);

// READ - GET /api/missions/status/:status
router.get('/status/:status', missionController.getMissionsByStatus);

// READ - GET /api/missions/type/:type
router.get('/type/:type', missionController.getMissionsByType);

// READ - GET /api/missions/:id (must be last to avoid conflicts)
router.get('/:id', missionController.getMissionById);

module.exports = router;