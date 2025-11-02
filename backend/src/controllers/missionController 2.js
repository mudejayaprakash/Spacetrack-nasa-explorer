/**
 * Project Controller
 * Handles all project-related business logic using Sequelize
 */

const { Project } = require('../models/Mission');
const { Op } = require('sequelize');

const projectController = {
    // GET /api/missions - Get all projects
    getAllMissions: async (req, res) => {
        try {
            const projects = await Project.findAll({
                order: [['projectId', 'ASC']]
            });
            
            res.status(200).json({
                success: true,
                count: projects.length,
                data: projects
            });
        } catch (error) {
            console.error('Error in getAllMissions:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch projects',
                message: error.message
            });
        }
    },

    // GET /api/missions/:id - Get project by ID
    getMissionById: async (req, res) => {
        try {
            const { id } = req.params;
            const project = await Project.findByPk(id);

            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Project not found',
                    message: `No project found with ID: ${id}`
                });
            }

            res.status(200).json({
                success: true,
                data: project
            });
        } catch (error) {
            console.error('Error in getMissionById:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch project',
                message: error.message
            });
        }
    },

    // GET /api/missions/status/:status - Get projects by status
    getMissionsByStatus: async (req, res) => {
        try {
            const { status } = req.params;
            const projects = await Project.findAll({
                where: {
                    status: {
                        [Op.iLike]: status
                    }
                },
                order: [['projectId', 'ASC']]
            });

            res.status(200).json({
                success: true,
                count: projects.length,
                status: status,
                data: projects
            });
        } catch (error) {
            console.error('Error in getMissionsByStatus:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch projects by status',
                message: error.message
            });
        }
    },

    // GET /api/missions/type/:type - Get projects by category
    getMissionsByType: async (req, res) => {
        try {
            const { type } = req.params;
            const projects = await Project.findAll({
                where: {
                    category: {
                        [Op.iLike]: type
                    }
                },
                order: [['projectId', 'ASC']]
            });

            res.status(200).json({
                success: true,
                count: projects.length,
                category: type,
                data: projects
            });
        } catch (error) {
            console.error('Error in getMissionsByType:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to fetch projects by category',
                message: error.message
            });
        }
    },

    // CREATE - POST /api/missions (NEW - allow users to create projects)
    createMission: async (req, res) => {
        try {
            const { name, description, category, startDate, status } = req.body;

            // Validation
            if (!name) {
                return res.status(400).json({
                    success: false,
                    error: 'Missing required fields',
                    message: 'Project name is required'
                });
            }

            // Create project
            const newProject = await Project.create({
                name,
                description: description || '',
                category: category || 'General',
                startDate: startDate || new Date().toISOString().split('T')[0],
                status: status || 'Active'
            });

            res.status(201).json({
                success: true,
                message: 'Project created successfully',
                data: newProject
            });
        } catch (error) {
            console.error('Error in createMission:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to create project',
                message: error.message
            });
        }
    },

    // UPDATE - PUT /api/missions/:id (NEW)
    updateMission: async (req, res) => {
        try {
            const { id } = req.params;
            const updates = req.body;

            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Project not found',
                    message: `No project found with ID: ${id}`
                });
            }

            await project.update(updates);

            res.status(200).json({
                success: true,
                message: 'Project updated successfully',
                data: project
            });
        } catch (error) {
            console.error('Error in updateMission:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to update project',
                message: error.message
            });
        }
    },

    // DELETE - DELETE /api/missions/:id (NEW)
    deleteMission: async (req, res) => {
        try {
            const { id } = req.params;

            const project = await Project.findByPk(id);
            if (!project) {
                return res.status(404).json({
                    success: false,
                    error: 'Project not found',
                    message: `No project found with ID: ${id}`
                });
            }

            await project.destroy();

            res.status(200).json({
                success: true,
                message: 'Project deleted successfully',
                data: { id: parseInt(id) }
            });
        } catch (error) {
            console.error('Error in deleteMission:', error);
            res.status(500).json({
                success: false,
                error: 'Failed to delete project',
                message: error.message
            });
        }
    }
};

module.exports = projectController;