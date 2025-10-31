/**
 * Mission Routes (Projects)
 * Define all project-related API endpoints
 */

const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

// ============================================
// PROJECT ROUTES
// ============================================

// CREATE - POST /api/missions
router.post('/', missionController.createMission);

// READ - GET /api/missions
router.get('/', missionController.getAllMissions);

// READ - GET /api/missions/status/:status
router.get('/status/:status', missionController.getMissionsByStatus);

// READ - GET /api/missions/type/:type
router.get('/type/:type', missionController.getMissionsByType);

// READ - GET /api/missions/:id (must be last to avoid conflicts)
router.get('/:id', missionController.getMissionById);

// UPDATE - PUT /api/missions/:id
router.put('/:id', missionController.updateMission);

// DELETE - DELETE /api/missions/:id
router.delete('/:id', missionController.deleteMission);

module.exports = router;