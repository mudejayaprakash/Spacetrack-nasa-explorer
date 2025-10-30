/**
 * Activity Routes
 * Define all activity-related API endpoints
 */

const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// ============================================
// ACTIVITY ROUTES
// ============================================

// CREATE - POST /api/activities
router.post('/', activityController.createActivity);

// READ - GET /api/activities (with optional query params)
router.get('/', activityController.getAllActivities);

// READ - GET /api/activities/:id
router.get('/:id', activityController.getActivityById);

// READ - GET /api/activities/mission/:missionId
router.get('/mission/:missionId', activityController.getActivitiesByMission);

// UPDATE - PUT /api/activities/:id
router.put('/:id', activityController.updateActivity);

// DELETE - DELETE /api/activities/:id
router.delete('/:id', activityController.deleteActivity);

module.exports = router;