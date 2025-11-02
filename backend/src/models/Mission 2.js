/**
 * Project Model (Sequelize)
 * Represents user-created observation projects/collections
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

// Define Project model
const Project = sequelize.define('Project', {
    projectId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'General'
        // Categories: Telescope, Naked Eye, Astrophotography, Learning, etc.
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Active'
        // Active, Completed, Planned
    }
}, {
    tableName: 'projects',
    timestamps: true,
    underscored: true
});

// Seed initial projects (examples for users to see)
async function seedProjects() {
    const projectsData = [
        {
            name: 'My 2025 Stargazing Journey',
            description: 'Personal observations and discoveries throughout 2025 - documenting my growth as an amateur astronomer',
            category: 'General',
            startDate: '2025-01-01',
            status: 'Active'
        },
        {
            name: 'Learning Constellations',
            description: 'Systematic project to identify and memorize all major constellations visible from my location',
            category: 'Learning',
            startDate: '2025-01-15',
            status: 'Active'
        },
        {
            name: 'Backyard Telescope Sessions',
            description: 'Deep sky observations using my 8-inch Dobsonian telescope from home',
            category: 'Telescope',
            startDate: '2025-02-01',
            status: 'Active'
        },
        {
            name: 'ISS Tracking Adventures',
            description: 'Tracking and photographing International Space Station passes over my location',
            category: 'Naked Eye',
            startDate: '2025-03-01',
            status: 'Active'
        },
        {
            name: 'Astrophotography Learning',
            description: 'My journey learning to photograph celestial objects - from moon shots to deep sky',
            category: 'Astrophotography',
            startDate: '2025-01-20',
            status: 'Active'
        }
    ];

    try {
        const count = await Project.count();
        
        if (count === 0) {
            console.log('📊 Seeding example projects...');
            await Project.bulkCreate(projectsData);
            console.log('✅ Projects seeded successfully!');
        } else {
            console.log('ℹ️  Projects already exist, skipping seed.');
        }
    } catch (error) {
        console.error('❌ Error seeding projects:', error.message);
    }
}

module.exports = { Project, seedProjects };