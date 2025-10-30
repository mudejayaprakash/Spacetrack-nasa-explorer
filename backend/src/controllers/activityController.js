/**
 * Activity Controller
 * Handles all activity-related business logic (CRUD operations)
 */

const ActivityModel = require('../models/Activity');
const MissionModel = require('../models/Mission');

const activityController = {
    // CREATE - POST /api/activities
    createActivity: (req, res) => {
        try {
            const { missionId, type, date, title, description, location } = req.body;

            // Validation
            if (!missionId || !type || !date || !title) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                    message: 'missionId, type, date, and title are required'
                });
            }

            // Verify mission exists
            const mission = MissionModel.findById(missionId);
            if (!mission) {
                return res.status(404).json({
                    success: false,
                    error: 'Mission not found',
                    message: `No mission found with ID: ${missionId}`
                });
            }

            // Create activity
            const newActivity = ActivityModel.create({
                missionId,
                type,
                date,
                title,
                description,
                location
            });

            res.status(201).json({
                success: true,
                message: 'Activity created successfully',
                data: newActivity
            });
        } catch (error) {
            console.error('Error in createActivity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create activity',
                message: error.message
            });
        }
    },

    // READ - GET /api/activities
    getAllActivities: (req, res) => {
        try {
            const { missionId, type, search } = req.query;

            let activities;

            // Filter by query parameters
            if (search) {
                activities = ActivityModel.search(search);
            } else if (missionId) {
                activities = ActivityModel.findByMissionId(missionId);
            } else if (type) {
                activities = ActivityModel.findByType(type);
            } else {
                activities = ActivityModel.findAll();
            }

            res.status(200).json({
                success: true,
                count: activities.length,
                data: activities
            });
        } catch (error) {
            console.error('Error in getAllActivities:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activities',
                message: error.message
            });
        }
    },

    // READ - GET /api/activities/:id
    getActivityById: (req, res) => {
        try {
            const { id } = req.params;
            const activity = ActivityModel.findById(id);

            if (!activity) {
                return res.status(404).json({
                    success: false,
                    error: 'Activity not found',
                    message: `No activity found with ID: ${id}`
                });
            }

            res.status(200).json({
                success: true,
                data: activity
            });
        } catch (error) {
            console.error('Error in getActivityById:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activity',
                message: error.message
            });
        }
    },

    // UPDATE - PUT /api/activities/:id
    updateActivity: (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Check if activity exists
            const existingActivity = ActivityModel.findById(id);
            if (!existingActivity) {
                return res.status(404).json({
                    success: false,
                    error: 'Activity not found',
                    message: `No activity found with ID: ${id}`
                });
            }

            // If missionId is being updated, verify the mission exists
            if (updates.missionId) {
                const mission = MissionModel.findById(updates.missionId);
                if (!mission) {
                    return res.status(404).json({
                        success: false,
                        error: 'Mission not found',
                        message: `No mission found with ID: ${updates.missionId}`
                    });
                }
            }

            // Update activity
            const updatedActivity = ActivityModel.update(id, updates);

            res.status(200).json({
                success: true,
                message: 'Activity updated successfully',
                data: updatedActivity
            });
        } catch (error) {
            console.error('Error in updateActivity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update activity',
                message: error.message
            });
        }
    },

    // DELETE - DELETE /api/activities/:id
    deleteActivity: (req, res) => {
        try {
            const { id } = req.params;

            // Check if activity exists
            const existingActivity = ActivityModel.findById(id);
            if (!existingActivity) {
                return res.status(404).json({
                    success: false,
                    error: 'Activity not found',
                    message: `No activity found with ID: ${id}`
                });
            }

            // Delete activity
            const deleted = ActivityModel.delete(id);

            if (deleted) {
                res.status(200).json({
                    success: true,
                    message: 'Activity deleted successfully',
                    data: { id: parseInt(id) }
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: 'Failed to delete activity'
                });
            }
        } catch (error) {
            console.error('Error in deleteActivity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete activity',
                message: error.message
            });
        }
    },

    // GET /api/activities/mission/:missionId
    getActivitiesByMission: (req, res) => {
        try {
            const { missionId } = req.params;

            // Verify mission exists
            const mission = MissionModel.findById(missionId);
            if (!mission) {
                return res.status(404).json({
                    success: false,
                    error: 'Mission not found',
                    message: `No mission found with ID: ${missionId}`
                });
            }

            const activities = ActivityModel.findByMissionId(missionId);

            res.status(200).json({
                success: true,
                mission: mission.name,
                count: activities.length,
                data: activities
            });
        } catch (error) {
            console.error('Error in getActivitiesByMission:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch activities',
                message: error.message
            });
        }
    }
};

module.exports = activityController;