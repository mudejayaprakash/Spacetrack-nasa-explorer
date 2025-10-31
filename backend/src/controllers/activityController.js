/**
 * Observation Controller
 * Handles all observation-related business logic using Sequelize (CRUD operations)
 */

const { Observation } = require('../models/Activity');
const { Project } = require('../models/Mission');
const { Op } = require('sequelize');

const observationController = {
    // CREATE - POST /api/activities
    createActivity: async (req, res) => {
        try {
            const { projectId, observationType, date, time, title, objectObserved, location, equipment, conditions, description, rating, imageUrl } = req.body;

            // Validation
            if (!projectId || !observationType || !date || !title) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                    message: 'projectId, observationType, date, and title are required'
                });
            }

            // Verify project exists
            const project = await Project.findByPk(projectId);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Project not found',
                    message: `No project found with ID: ${projectId}`
                });
            }

            // Create observation in database
            const newObservation = await Observation.create({
                projectId,
                observationType,
                date,
                time: time || null,
                title,
                objectObserved: objectObserved || '',
                location: location || '',
                equipment: equipment || '',
                conditions: conditions || '',
                description: description || '',
                rating: rating || null,
                imageUrl: imageUrl || null
            });

            res.status(201).json({
                success: true,
                message: 'Observation created successfully',
                data: newObservation
            });
        } catch (error) {
            console.error('Error in createActivity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create observation',
                message: error.message
            });
        }
    },

    // READ - GET /api/activities
    getAllActivities: async (req, res) => {
        try {
            const { projectId, observationType, search } = req.query;

            let whereClause = {};

            // Filter by projectId
            if (projectId) {
                whereClause.projectId = projectId;
            }

            // Filter by type
            if (observationType) {
                whereClause.observationType = {
                    [Op.iLike]: `%${observationType}%`
                };
            }

            // Search across multiple fields
            if (search) {
                whereClause[Op.or] = [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } },
                    { objectObserved: { [Op.iLike]: `%${search}%` } },
                    { location: { [Op.iLike]: `%${search}%` } },
                    { equipment: { [Op.iLike]: `%${search}%` } },
                    { observationType: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const observations = await Observation.findAll({
                where: whereClause,
                include: [{
                    model: Project,
                    as: 'project',
                    attributes: ['projectId', 'name', 'category', 'status']
                }],
                order: [['date', 'DESC'], ['id', 'DESC']]
            });

            res.status(200).json({
                success: true,
                count: observations.length,
                data: observations
            });
        } catch (error) {
            console.error('Error in getAllActivities:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch observations',
                message: error.message
            });
        }
    },

    // READ - GET /api/activities/:id
    getActivityById: async (req, res) => {
        try {
            const { id } = req.params;
            const observation = await Observation.findByPk(id, {
                include: [{
                    model: Project,
                    as: 'project',
                    attributes: ['projectId', 'name', 'category', 'status']
                }]
            });

            if (!observation) {
                return res.status(404).json({
                    success: false,
                    error: 'Observation not found',
                    message: `No observation found with ID: ${id}`
                });
            }

            res.status(200).json({
                success: true,
                data: observation
            });
        } catch (error) {
            console.error('Error in getActivityById:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch observation',
                message: error.message
            });
        }
    },

    // UPDATE - PUT /api/activities/:id
    updateActivity: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            // Check if observation exists
            const observation = await Observation.findByPk(id);
            if (!observation) {
                return res.status(404).json({
                    success: false,
                    error: 'Observation not found',
                    message: `No observation found with ID: ${id}`
                });
            }

            // If projectId is being updated, verify the project exists
            if (updates.projectId) {
                const project = await Project.findByPk(updates.projectId);
                if (!project) {
                    return res.status(404).json({
                        success: false,
                        error: 'Project not found',
                        message: `No project found with ID: ${updates.projectId}`
                    });
                }
            }

            // Update observation
            await observation.update(updates);

            // Fetch updated observation with project details
            const updatedObservation = await Observation.findByPk(id, {
                include: [{
                    model: Project,
                    as: 'project',
                    attributes: ['projectId', 'name', 'category', 'status']
                }]
            });

            res.status(200).json({
                success: true,
                message: 'Observation updated successfully',
                data: updatedObservation
            });
        } catch (error) {
            console.error('Error in updateActivity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update observation',
                message: error.message
            });
        }
    },

    // DELETE - DELETE /api/activities/:id
    deleteActivity: async (req, res) => {
        try {
            const { id } = req.params;

            // Check if observation exists
            const observation = await Observation.findByPk(id);
            if (!observation) {
                return res.status(404).json({
                    success: false,
                    error: 'Observation not found',
                    message: `No observation found with ID: ${id}`
                });
            }

            // Delete observation
            await observation.destroy();

            res.status(200).json({
                success: true,
                message: 'Observation deleted successfully',
                data: { id: parseInt(id) }
            });
        } catch (error) {
            console.error('Error in deleteActivity:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete observation',
                message: error.message
            });
        }
    },

    // GET /api/activities/mission/:missionId
    getActivitiesByMission: async (req, res) => {
        try {
            const { missionId } = req.params;

            // Verify project exists
            const project = await Project.findByPk(missionId);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Project not found',
                    message: `No project found with ID: ${missionId}`
                });
            }

            const observations = await Observation.findAll({
                where: { projectId: missionId },
                include: [{
                    model: Project,
                    as: 'project',
                    attributes: ['projectId', 'name', 'category', 'status']
                }],
                order: [['date', 'DESC']]
            });

            res.status(200).json({
                success: true,
                project: project.name,
                count: observations.length,
                data: observations
            });
        } catch (error) {
            console.error('Error in getActivitiesByMission:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch observations',
                message: error.message
            });
        }
    }
};

module.exports = observationController;