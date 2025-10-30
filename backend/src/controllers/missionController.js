/**
 * Mission Controller
 * Handles all mission-related business logic
 */

const MissionModel = require('../models/Mission');

const missionController = {
    // GET /api/missions - Get all missions
    getAllMissions: (req, res) => {
        try {
            const missions = MissionModel.findAll();
            
            res.status(200).json({
                success: true,
                count: missions.length,
                data: missions
            });
        } catch (error) {
            console.error('Error in getAllMissions:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch missions',
                message: error.message
            });
        }
    },

    // GET /api/missions/:id - Get mission by ID
    getMissionById: (req, res) => {
        try {
            const { id } = req.params;
            const mission = MissionModel.findById(id);

            if (!mission) {
                return res.status(404).json({
                    success: false,
                    error: 'Mission not found',
                    message: `No mission found with ID: ${id}`
                });
            }

            res.status(200).json({
                success: true,
                data: mission
            });
        } catch (error) {
            console.error('Error in getMissionById:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch mission',
                message: error.message
            });
        }
    },

    // GET /api/missions/status/:status - Get missions by status
    getMissionsByStatus: (req, res) => {
        try {
            const { status } = req.params;
            const missions = MissionModel.findByStatus(status);

            res.status(200).json({
                success: true,
                count: missions.length,
                status: status,
                data: missions
            });
        } catch (error) {
            console.error('Error in getMissionsByStatus:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch missions by status',
                message: error.message
            });
        }
    },

    // GET /api/missions/type/:type - Get missions by type
    getMissionsByType: (req, res) => {
        try {
            const { type } = req.params;
            const missions = MissionModel.findByType(type);

            res.status(200).json({
                success: true,
                count: missions.length,
                type: type,
                data: missions
            });
        } catch (error) {
            console.error('Error in getMissionsByType:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch missions by type',
                message: error.message
            });
        }
    }
};

module.exports = missionController;