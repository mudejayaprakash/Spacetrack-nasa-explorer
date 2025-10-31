const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// CREATE - POST /api/activities
router.post('/', activityController.createActivity);

// READ all - GET /api/activities
router.get('/', activityController.getAllActivities);

// READ one - GET /api/activities/:id
router.get('/:id', activityController.getActivityById);

// UPDATE - PUT /api/activities/:id  ← Make sure this exists!
router.put('/:id', activityController.updateActivity);

// DELETE - DELETE /api/activities/:id
router.delete('/:id', activityController.deleteActivity);

// READ by mission - GET /api/activities/mission/:missionId
router.get('/mission/:missionId', activityController.getActivitiesByMission);

module.exports = router;