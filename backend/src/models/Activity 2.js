/**
 * Observation Model (Sequelize)
 * Represents personal space observations and stargazing entries
 */

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const { Project } = require('./Mission');

// Define Observation model
const Observation = sequelize.define('Observation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'project_id'
        }
    },
    observationType: {
        type: DataTypes.STRING(50),
        allowNull: false
        // Telescope, Naked Eye, Binoculars, ISS Pass, Meteor Shower, Eclipse, etc.
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.TIME,
        allowNull: true
    },
    title: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    objectObserved: {
        type: DataTypes.STRING(100),
        allowNull: true
        // e.g., Saturn, Jupiter, Andromeda Galaxy, ISS, Moon
    },
    location: {
        type: DataTypes.STRING(200),
        allowNull: true
        // e.g., Backyard, Local Observatory, Dark Sky Park
    },
    equipment: {
        type: DataTypes.STRING(200),
        allowNull: true
        // e.g., 8-inch Dobsonian, Canon EOS, Naked Eye, 10x50 Binoculars
    },
    conditions: {
        type: DataTypes.STRING(200),
        allowNull: true
        // e.g., Clear sky, 60°F, slight breeze, good seeing
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
        // Detailed notes about what was observed
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 1,
            max: 5
        }
        // Quality of observation (1-5 stars)
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true
        // URL to uploaded image (we'll implement upload later)
    }
}, {
    tableName: 'observations',
    timestamps: true,
    underscored: true
});

// Define relationship: Observation belongs to Project
Observation.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'project'
});

// Seed initial observations (examples) - Past 3 months with images
async function seedObservations() {
    const observationsData = [
        // October 2025 Observations
        {
            projectId: 1,
            observationType: 'Telescope',
            date: '2025-10-28',
            time: '21:15:00',
            title: 'Stunning view of Jupiter and Europa',
            objectObserved: 'Jupiter',
            location: 'Backyard Observatory',
            equipment: '8-inch Dobsonian, 10mm eyepiece',
            conditions: 'Clear sky, excellent seeing, 55°F',
            description: 'Incredible night! Jupiter showed remarkable detail with the Great Red Spot visible. Europa was clearly separated from Jupiter. Could see shadow of Io crossing the planet. Spent over an hour observing. This is why I love astronomy!',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400'
        },
        {
            projectId: 2,
            observationType: 'Naked Eye',
            date: '2025-10-25',
            time: '20:30:00',
            title: 'Perfect night for Cassiopeia identification',
            objectObserved: 'Cassiopeia',
            location: 'Local Dark Sky Park',
            equipment: 'Naked eye, star chart',
            conditions: 'Crystal clear, new moon, no light pollution',
            description: 'Drove 45 minutes to the dark sky park - totally worth it! Cassiopeia was stunning. The W shape was perfectly visible. Taught my friend how to find it using the Big Dipper pointer stars.',
            rating: 5
        },
        {
            projectId: 1,
            observationType: 'Astrophotography',
            date: '2025-10-20',
            time: '22:45:00',
            title: 'Captured stunning Orion Nebula M42',
            objectObserved: 'Orion Nebula (M42)',
            location: 'Backyard',
            equipment: 'Canon EOS R6, 200mm lens, star tracker, tripod',
            conditions: 'Clear, minimal light pollution, 58°F',
            description: '30-second exposures at ISO 3200. Stacked 25 images in post-processing. The nebula details came out beautifully! You can see the trapezium stars clearly. Best astrophoto I have taken so far!',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=400'
        },
        {
            projectId: 3,
            observationType: 'ISS Pass',
            date: '2025-10-18',
            time: '19:42:00',
            title: 'Brilliant ISS pass - magnitude -3.5',
            objectObserved: 'International Space Station',
            location: 'Front yard',
            equipment: 'Naked eye, ISS Detector app',
            conditions: 'Clear evening, high visibility',
            description: 'Amazing overhead pass! ISS appeared in the southwest, reached almost directly overhead, and disappeared in the northeast. Lasted about 5 minutes. Brighter than any star! My neighbors came out to watch too.',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=400'
        },
        {
            projectId: 1,
            observationType: 'Telescope',
            date: '2025-10-12',
            time: '21:00:00',
            title: 'Saturn rings at maximum tilt',
            objectObserved: 'Saturn',
            location: 'Backyard',
            equipment: '8-inch Dobsonian, 25mm eyepiece',
            conditions: 'Good seeing, light breeze',
            description: 'Saturn looked magnificent tonight! The rings are at a great tilt angle this year. Could see Cassini Division clearly. Titan was visible as a small dot. Used a 2x Barlow lens for higher magnification.',
            rating: 4,
            imageUrl: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400'
        },
        
        // September 2025 Observations
        {
            projectId: 2,
            observationType: 'Learning',
            date: '2025-09-28',
            time: '20:15:00',
            title: 'Learned to find Andromeda Galaxy',
            objectObserved: 'Andromeda Galaxy (M31)',
            location: 'Backyard',
            equipment: '10x50 binoculars, star chart',
            conditions: 'Clear, some light pollution',
            description: 'Used the star-hopping method from Cassiopeia to find M31. It appeared as a faint smudge even in binoculars! Planning to photograph it next time. This is my first galaxy observation!',
            rating: 4
        },
        {
            projectId: 4,
            observationType: 'Meteor Shower',
            date: '2025-09-22',
            time: '23:30:00',
            title: 'Draconid meteor shower peak',
            objectObserved: 'Draconid Meteors',
            location: 'Rural field (1 hour drive)',
            equipment: 'Naked eye, blanket, hot coffee',
            conditions: 'Clear, dark skies, 62°F',
            description: 'Incredible meteor shower! Counted 47 meteors in 2 hours. Several left persistent trains. One particularly bright fireball (magnitude -4) was absolutely stunning. Worth the drive!',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400'
        },
        {
            projectId: 1,
            observationType: 'Telescope',
            date: '2025-09-15',
            time: '21:30:00',
            title: 'Double star Albireo - beautiful contrast',
            objectObserved: 'Albireo (Beta Cygni)',
            location: 'Backyard',
            equipment: '8-inch Dobsonian, 25mm eyepiece',
            conditions: 'Clear, stable atmosphere',
            description: 'One of the most beautiful double stars! The color contrast between the golden-yellow primary and blue-green secondary is striking. Perfect example to show beginners. My favorite double star system.',
            rating: 5
        },
        {
            projectId: 5,
            observationType: 'Astrophotography',
            date: '2025-09-10',
            time: '22:00:00',
            title: 'First successful Milky Way capture',
            objectObserved: 'Milky Way Core',
            location: 'Dark Sky Reserve (2 hours drive)',
            equipment: 'Canon EOS R6, 24mm f/1.4 lens, tripod',
            conditions: 'Perfect - new moon, clear, no clouds',
            description: '20-second exposures at ISO 6400. The galactic center was incredible! Captured dust lanes, nebulae, and countless stars. Took 40 frames for stacking. This makes the drive worth it every time!',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400'
        },
        
        // August 2025 Observations
        {
            projectId: 3,
            observationType: 'ISS Pass',
            date: '2025-08-28',
            time: '20:15:00',
            title: 'ISS and Moon conjunction',
            objectObserved: 'ISS + Moon',
            location: 'Backyard',
            equipment: 'Naked eye, binoculars',
            conditions: 'Clear evening, crescent moon',
            description: 'Incredible timing! ISS passed just below the crescent moon. Used binoculars to watch it - could almost make out the solar panels! The juxtaposition of the ISS and moon was beautiful.',
            rating: 5
        },
        {
            projectId: 1,
            observationType: 'Telescope',
            date: '2025-08-22',
            time: '22:00:00',
            title: 'Ring Nebula M57 - first planetary nebula',
            objectObserved: 'Ring Nebula (M57)',
            location: 'Backyard',
            equipment: '8-inch Dobsonian, 10mm eyepiece, OIII filter',
            conditions: 'Clear, good transparency',
            description: 'My first planetary nebula observation! The ring structure was clearly visible. Using an OIII filter made a huge difference - the nebula popped out against the background. Lyra was easy to find.',
            rating: 4
        },
        {
            projectId: 2,
            observationType: 'Naked Eye',
            date: '2025-08-15',
            time: '21:00:00',
            title: 'Summer Triangle and Milky Way',
            objectObserved: 'Summer Triangle asterism',
            location: 'Lake shore',
            equipment: 'Naked eye',
            conditions: 'Perfect summer night, low humidity',
            description: 'Beautiful evening by the lake. The Summer Triangle (Deneb, Vega, Altair) was prominent. The Milky Way ran right through Cygnus. Saw 3 satellites pass through. Perfect end to summer!',
            rating: 5
        },
        {
            projectId: 4,
            observationType: 'Meteor Shower',
            date: '2025-08-12',
            time: '02:30:00',
            title: 'Perseid meteor shower peak - spectacular!',
            objectObserved: 'Perseid Meteors',
            location: 'Mountain observatory parking lot',
            equipment: 'Naked eye, reclining chair',
            conditions: 'Perfect - dark, clear, new moon',
            description: 'WOW! Best meteor shower I have ever seen! Counted 112 meteors in 3 hours. Multiple fireballs including one that broke apart. Several left glowing trains lasting 5-10 seconds. Worth staying up all night!',
            rating: 5,
            imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=400'
        },
        {
            projectId: 1,
            observationType: 'Telescope',
            date: '2025-08-05',
            time: '21:45:00',
            title: 'Hercules Cluster M13 - first globular',
            objectObserved: 'Hercules Cluster (M13)',
            location: 'Backyard',
            equipment: '8-inch Dobsonian, 25mm eyepiece',
            conditions: 'Clear, moderate seeing',
            description: 'My first globular cluster! M13 looked like a fuzzy ball in the eyepiece. Higher magnification revealed hundreds of individual stars around the edges. The core remained unresolved but glowing. Amazing!',
            rating: 4
        }
    ];

    try {
        const count = await Observation.count();
        
        if (count === 0) {
            console.log('📊 Seeding example observations...');
            await Observation.bulkCreate(observationsData);
            console.log('✅ Observations seeded successfully!');
        } else {
            console.log('ℹ️  Observations already exist, skipping seed.');
        }
    } catch (error) {
        console.error('❌ Error seeding observations:', error.message);
    }
}

module.exports = { Observation, seedObservations };